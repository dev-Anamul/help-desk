import { ResetPasswordSchema } from '@/schemas';
import { asyncHandler } from '@/utils/asyn-handler';
import { expressHandlebarsOption } from '@/utils/express-handlebars-option';
import { transporter } from '@/utils/transporter';
import { Request, Response } from 'express';
import hbs from 'nodemailer-express-handlebars';

export const resetPasswordEmailHandler = asyncHandler(
  async (req: Request, res: Response) => {
    // validate request body
    const data = ResetPasswordSchema.safeParse(req.body);

    // if validation fails, return error
    if (!data.success)
      return res.status(400).json({ message: data.error.errors });

    const mailOptions = {
      from: 'anamul@gmail.com',
      to: data.data.email,
      subject: 'Reset password',
      template: 'reset-password',
      context: {
        name: data.data.email,
        title: 'Reset Password',
        resetToken: data.data.resetToken,
      },
    };

    try {
      transporter.use('compile', hbs(expressHandlebarsOption()));
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
);
