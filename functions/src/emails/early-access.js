const variants = {
  Paciente: {
    label: "Acceso temprano · Pacientes",
    subject: "Ya estás en la lista de acceso temprano de Lurems",
    preheader: "Tu registro como paciente está confirmado. Te avisaremos cuando Lurems esté lista.",
    title: "Ya estás en la lista de Lurems.",
    introduction: "Tu registro anticipado como paciente quedó confirmado. Gracias por dar este primer paso con Lurems.",
    closing: "Estamos preparando un espacio que te ayude a encontrar más claridad en tu camino terapéutico. Nos alegra que seas parte de esta primera etapa.",
    primary: "#4CAF88", dark: "#1F5442", light: "#CBF1E0", subtle: "#EDFAF4",
  },
  "Psicólogo": {
    label: "Acceso temprano · Psicólogos",
    subject: "Ya estás en la lista profesional de acceso temprano de Lurems",
    preheader: "Recibimos tu interés en Lurems para profesionales. Te avisaremos cuando la app esté lista.",
    title: "Gracias por sumarte a esta primera etapa.",
    introduction: "Tu registro anticipado en la lista para psicólogos quedó confirmado. Gracias por compartir tu interés en Lurems y en el futuro de la práctica profesional.",
    closing: "Estamos preparando Lurems para acompañar el trabajo de los profesionales de la psicología. Nos alegra contar con tu interés desde el comienzo.",
    primary: "#7B6FD0", dark: "#383188", light: "#DDD9FF", subtle: "#F0EEFF",
  },
};

export function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, character => ({"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"})[character]);
}

export function renderEarlyAccessEmail({nombre, tipoUsuario}, {logoUrl = "https://lurems.lat/brand/lurems-logo-principal-transparent.png"} = {}) {
  if (!Object.hasOwn(variants, tipoUsuario)) throw new Error("Unsupported early access email type");
  const variant = variants[tipoUsuario];
  const logo = new URL(logoUrl);
  if (logo.protocol !== "https:" && !(logo.protocol === "http:" && ["localhost", "127.0.0.1"].includes(logo.hostname))) throw new Error("Invalid logo URL");
  const greeting = nombre?.trim() ? `Hola, ${nombre.trim()}.` : "Hola.";
  const notification = "Te avisaremos cuando la app esté lista.";
  const next = "Recibirás un correo con los siguientes pasos para acceder a Lurems. Por ahora, no necesitas hacer nada más.";
  const footer = `Recibes este mensaje porque te inscribiste en la lista de acceso temprano de Lurems como ${tipoUsuario.toLowerCase()}. Si no solicitaste este registro, responde a este correo para avisarnos.`;
  const text = `${greeting}\n\n${variant.title}\n\n${variant.introduction}\n\n${notification}\n${next}\n\n${variant.closing}\n\nConoce el proyecto: https://lurems.lat/\n\nEquipo Lurems\nClaridad en tu camino terapéutico\n\n${footer}\n`;
  const html = `<!doctype html>
<html lang="es" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="color-scheme" content="light">
  <title>${escapeHtml(variant.subject)}</title>
  <style>
    body, table, td, p, a, h1, h2 { font-family: Poppins, Arial, Helvetica, sans-serif; }
    a:focus-visible { outline: 2px solid ${variant.dark}; outline-offset: 4px; }
    @media only screen and (max-width: 620px) {
      .outer { padding: 16px !important; }
      .content { padding-left: 24px !important; padding-right: 24px !important; }
      h1 { font-size: 28px !important; line-height: 35px !important; }
    }
  </style>
</head>
<body style="margin:0; padding:0; background-color:#F5FAFA; color:#1A3A38; -webkit-text-size-adjust:100%;">
  <div aria-hidden="true" style="display:none; max-height:0; overflow:hidden; opacity:0; mso-hide:all;">${escapeHtml(variant.preheader)}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#F5FAFA;">
    <tr><td class="outer" align="center" style="padding:32px 16px;">
      <!--[if mso]><table role="presentation" width="600" align="center"><tr><td><![endif]-->
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px; background-color:#FFFFFF; border:1px solid #C8EDE8; border-radius:12px; overflow:hidden;">
        <tr><td height="4" style="height:4px; line-height:4px; font-size:0; background-color:${variant.primary};">&nbsp;</td></tr>
        <tr><td class="content" style="padding:32px 40px 24px;">
          <a href="https://lurems.lat/" style="display:inline-block; color:#1A3A38; text-decoration:none; font-size:12px; line-height:18px;"><img src="${escapeHtml(logo.href)}" width="160" alt="Lurems · Claridad en tu camino terapéutico" style="display:block; width:160px; max-width:100%; height:auto; border:0;"></a>
        </td></tr>
        <tr><td class="content" style="padding:0 40px 32px;">
          <p style="margin:0 0 16px; font-size:12px; line-height:16.8px; font-weight:600; color:${variant.dark};">${escapeHtml(variant.label)}</p>
          <h1 style="margin:0 0 24px; font-size:28px; line-height:35px; font-weight:700; color:#1A3A38;">${escapeHtml(variant.title)}</h1>
          <p style="margin:0 0 12px; font-size:16px; line-height:26.4px;">${escapeHtml(greeting)}</p>
          <p style="margin:0 0 24px; font-size:16px; line-height:26.4px;">${escapeHtml(variant.introduction)}</p>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${variant.subtle}; border:1px solid ${variant.light}; border-radius:12px;">
            <tr><td style="padding:24px;">
              <h2 style="margin:0 0 12px; font-size:18px; line-height:24.3px; font-weight:600; color:${variant.dark};">${notification}</h2>
              <p style="margin:0; font-size:14px; line-height:22.4px; color:#1A3A38;">${next}</p>
            </td></tr>
          </table>
          <p style="margin:24px 0; font-size:16px; line-height:26.4px;">${escapeHtml(variant.closing)}</p>
          <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr><td>
            <!--[if mso]><v:roundrect href="https://lurems.lat/" style="height:48px;v-text-anchor:middle;width:210px;" arcsize="42%" stroke="f" fillcolor="${variant.dark}"><w:anchorlock/><center style="color:#FFFFFF;font-family:Arial,sans-serif;font-size:14px;font-weight:bold;">Conoce el proyecto</center></v:roundrect><![endif]-->
            <!--[if !mso]><!--><a href="https://lurems.lat/" style="display:inline-block; background-color:${variant.dark}; border-radius:20px; color:#FFFFFF; font-size:14px; line-height:48px; font-weight:600; text-align:center; text-decoration:none; padding:0 24px; mso-hide:all;">Conoce el proyecto</a><!--<![endif]-->
          </td></tr></table>
          <p style="margin:32px 0 4px; font-size:14px; line-height:22.4px; font-weight:600;">Equipo Lurems</p>
          <p style="margin:0; font-size:12px; line-height:18px; color:#426460;">Claridad en tu camino terapéutico</p>
        </td></tr>
        <tr><td class="content" style="padding:24px 40px; border-top:1px solid #C8EDE8; background-color:#F5FAFA;">
          <p style="margin:0; font-size:12px; line-height:18px; color:#426460;">${escapeHtml(footer)}</p>
        </td></tr>
      </table>
      <!--[if mso]></td></tr></table><![endif]-->
    </td></tr>
  </table>
</body>
</html>`;
  return {subject: variant.subject, preheader: variant.preheader, html, text};
}
