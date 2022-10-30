const nodemailer = require('nodemailer');
const tokenService = require('./token.service');

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  async sendActivationMail(to) {
    const { refreshToken } = tokenService.generateTokens({ email: to });
    const link = `${process.env.API_URL}/api/auth/activate/${refreshToken}`;
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: `Account activation at Stack Overclone`,
      text: '',
      html: `
                <div>
                    <h1>For account activation click on the link!</h1>
                    <a href="${link}">click me for activation!</a>
                </div>
            `,
    });
  }

  async sendPswResetMail(to) {
    const { accessToken } = tokenService.generateTokens({ email: to });
    const link = `${process.env.CLIENT_URL}/password-reset/${accessToken}`;
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: `Password reset for Stack Overclone`,
      text: '',
      html: `
                <div>
                    <h1>Follow the link to reset your password</h1>
                    <a href="${link}">click me to reset password!</a>
                </div>
            `,
    });
  }
}

module.exports = new MailService();
