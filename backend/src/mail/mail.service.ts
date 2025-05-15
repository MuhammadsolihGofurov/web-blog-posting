import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail', // yoki smtp
      auth: {
        user: 'gofurovmuhammadsolih004@gmail.com',
        pass: 'oyxb nplu qigt hgcf', // Gmail uchun App Password kerak bo'ladi
      },
    });
  }

  async sendVerificationEmail(to: string, token: string) {
    const verifyLink = `http://localhost:9999/api/v1/auth/confirm-email?token=${token}`;
    await this.transporter.sendMail({
      from: 'NestJS Auth <your_email@gmail.com>',
      to,
      subject: 'Email verification',
      html: `
        <h2>Email Verification</h2>
        <p>Click the link below to verify your email:</p>
        <a href="${verifyLink}">${verifyLink}</a>
      `,
    });
  }
}
