#!/usr/bin/env python3
"""Encode hero candidates from a verified, non-deployable backup. Python 3.9+."""
import argparse
import hashlib
import json
from pathlib import Path
import shutil
import struct
import subprocess

ROOT = Path(__file__).resolve().parents[1]
SCENES = ("solo", "triste", "agotado", "abrumado", "estresado", "perdido", "incomprendido")


def sha256(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def atoms(data, start=0, end=None):
    end = len(data) if end is None else end
    while start + 8 <= end:
        size, kind = struct.unpack_from(">I4s", data, start)
        header = 8
        if size == 1:
            size = struct.unpack_from(">Q", data, start + 8)[0]
            header = 16
        if size == 0:
            size = end - start
        if size < header or start + size > end:
            raise ValueError("Invalid MP4 atom")
        yield kind, start, start + header, start + size
        start += size


def inventory(path):
    data = path.read_bytes()
    top = list(atoms(data))
    result = {"file": path.name, "bytes": len(data), "sha256": sha256(path)}
    offsets = {kind: start for kind, start, _, _ in top}
    result["fast_start"] = offsets[b"moov"] < offsets[b"mdat"]
    moov = next(a for a in top if a[0] == b"moov")
    tracks = []
    for kind, _, body, end in atoms(data, moov[2], moov[3]):
        if kind == b"mvhd":
            offset = body + (20 if data[body] == 1 else 12)
            timescale = struct.unpack_from(">I", data, offset)[0]
            duration = struct.unpack_from(">Q" if data[body] == 1 else ">I", data, offset + 4)[0]
            result["duration_s"] = duration / timescale
        if kind == b"trak":
            for subkind, _, subbody, subend in atoms(data, body, end):
                if subkind == b"mdia":
                    handler = next(a for a in atoms(data, subbody, subend) if a[0] == b"hdlr")
                    tracks.append(data[handler[2] + 8:handler[2] + 12].decode())
                if subkind == b"tkhd":
                    width, height = struct.unpack_from(">II", data, subend - 8)
                    if width and height:
                        result.update(width=width >> 16, height=height >> 16)
    result["audio"] = "soun" in tracks
    result["codec"] = "H.264/avc1" if b"avc1" in data else "unknown"
    def read_samples(start, end):
        for kind, _, body, limit in atoms(data, start, end):
            if kind in (b"moov", b"trak", b"mdia", b"minf", b"stbl"):
                read_samples(body, limit)
            elif kind == b"mdhd":
                offset = body + (20 if data[body] == 1 else 12)
                result["timescale"] = struct.unpack_from(">I", data, offset)[0]
                result["media_ticks"] = struct.unpack_from(">Q" if data[body] == 1 else ">I", data, offset + 4)[0]
            elif kind == b"stsz":
                result["frames"] = struct.unpack_from(">I", data, body + 8)[0]
    read_samples(0, len(data))
    result["frame_rate"] = result["frames"] * result["timescale"] / result["media_ticks"]
    return result


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--ffmpeg", default="ffmpeg")
    parser.add_argument("--work-dir", type=Path, default=ROOT / "output/video-optimization/2026-11-04")
    parser.add_argument("--profile", default="full-crf26")
    parser.add_argument("--crf", type=int, default=26)
    parser.add_argument("--duration", type=float, help="Omit to retain the entire source, including its loop.")
    parser.add_argument("--codec", choices=("h264", "vp9"), default="h264")
    parser.add_argument("--scenes", nargs="+", choices=SCENES, default=SCENES)
    args = parser.parse_args()
    if Path(args.profile).name != args.profile or args.profile.startswith("."):
        parser.error("profile must be a single directory name")
    if not 0 <= args.crf <= (51 if args.codec == "h264" else 63):
        parser.error("CRF outside the codec's supported range")
    if args.duration is not None and args.duration <= 0:
        parser.error("duration must be positive")
    work = args.work_dir.resolve()
    # Neither backups nor candidates may be put in a deployable directory.
    for deploy in (ROOT / "public", ROOT / "dist"):
        if work == deploy or deploy in work.parents:
            parser.error("work-dir must be outside public/ and dist/")
    backup = work / "originals"
    backup.mkdir(parents=True, exist_ok=True)
    manifest_path = work / "originals-manifest.json"
    existing = json.loads(manifest_path.read_text()) if manifest_path.exists() else []
    recorded = {entry["file"]: entry["sha256"] for entry in existing}
    originals = []
    for scene in SCENES:
        name = f"lurems-{scene}.mp4"
        source = ROOT / "public/media" / name
        saved = backup / name
        if not saved.exists():
            if name in recorded:
                raise RuntimeError(f"Missing recorded backup: {saved}")
            shutil.copy2(source, saved)
        if name in recorded and sha256(saved) != recorded[name]:
            raise RuntimeError(f"Backup checksum mismatch: {saved}")
        # Before removal, also verify that the deployable original matches its backup.
        if source.exists() and sha256(source) != sha256(saved):
            raise RuntimeError(f"Original differs from backup: {source}")
        originals.append({"scene": scene, **inventory(saved)})
    manifest_path.write_text(json.dumps(originals, indent=2) + "\n")
    destination = work / args.profile
    destination.mkdir(parents=True, exist_ok=True)
    version = subprocess.run([args.ffmpeg, "-version"], check=True, capture_output=True, text=True).stdout
    outputs = []
    for scene in args.scenes:
        source = backup / f"lurems-{scene}.mp4"
        output = destination / f"lurems-{scene}.{'mp4' if args.codec == 'h264' else 'webm'}"
        command = [args.ffmpeg, "-hide_banner", "-nostdin", "-y", "-i", str(source),
                   "-map", "0:v:0", "-an", "-sn", "-dn", "-map_metadata", "-1"]
        if args.duration:
            command += ["-t", str(args.duration)]
        if args.codec == "h264":
            # Keep source frame rate, dimensions and colors. Two-second GOP for seeking.
            command += ["-c:v", "libx264", "-preset", "slow", "-crf", str(args.crf),
                        "-pix_fmt", "yuv420p", "-profile:v", "high", "-level:v", "3.1",
                        "-force_key_frames", "expr:gte(t,n_forced*2)", "-movflags", "+faststart"]
        else:
            command += ["-c:v", "libvpx-vp9", "-crf", str(args.crf), "-b:v", "0",
                        "-deadline", "good", "-cpu-used", "2", "-row-mt", "1", "-pix_fmt", "yuv420p"]
        command += [str(output)]
        completed = subprocess.run(command, capture_output=True, text=True)
        (destination / f"{scene}-encode.log").write_text(completed.stderr)
        completed.check_returncode()
        # Decode every frame, not just metadata. Fail on decode errors.
        subprocess.run([args.ffmpeg, "-v", "error", "-xerror", "-nostdin", "-i", str(output),
                        "-map", "0:v:0", "-f", "null", "-"], check=True)
        item = inventory(output) if args.codec == "h264" else {"file": output.name, "bytes": output.stat().st_size, "sha256": sha256(output)}
        outputs.append({"scene": scene, **item, "command": command})
        print(f"{scene}: {item['bytes']:,} bytes", flush=True)
    (destination / "manifest.json").write_text(json.dumps({"ffmpeg": version, "outputs": outputs}, indent=2) + "\n")
    print(f"Total: {sum(item['bytes'] for item in outputs):,} bytes", flush=True)


if __name__ == "__main__":
    main()
