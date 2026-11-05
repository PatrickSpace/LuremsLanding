import nodemailer from "nodemailer";
import { z } from "zod";

export function createGmailTransport({user, password}, makeTransport = nodemailer.createTransport) {
  if (!z.email().safeParse(user).success || !user.toLowerCase().endsWith("@gmail.com") || !password?.trim()) {
    throw Object.assign(new Error("Email configuration missing"), {code: "EMAIL_CONFIG"});
  }
  const transport = makeTransport({
    host: "smtp.gmail.com", port: 465, secure: true,
    auth: {user, pass: password.replace(/\s/g, "")},
    connectionTimeout: 10000, greetingTimeout: 10000, socketTimeout: 20000,
    logger: false, debug: false,
    disableFileAccess: true, disableUrlAccess: true,
  });
  return {
    verify: () => transport.verify(),
    send: message => transport.sendMail({
      ...message,
      from: {name: "Lurems", address: user},
      replyTo: user,
      envelope: {from: user, to: [message.to]},
      disableFileAccess: true, disableUrlAccess: true,
    }),
  };
}
