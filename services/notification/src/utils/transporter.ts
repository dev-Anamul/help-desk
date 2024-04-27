import nodemailer, { TransportOptions } from 'nodemailer';

export const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: false,
  // service: 'gmail',
  // auth: {
  //   user: process.env.EMAIL_USERNAME,
  //   pass: process.env.EMAIL_PASSWORD,
  // },
} as TransportOptions);
