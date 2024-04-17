import { expressHandlebarsOption } from '@/utils/express-handlebars-option';
import { transporter } from '@/utils/transporter';
import { Request, Response } from 'express';
import hbs from 'nodemailer-express-handlebars';

export const resetPasswordEmailHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const mailOptions = {
      from: 'anamul@gmail.com',
      to: 'jibon@gmail.com',
      subject: 'Test email',
      // text: 'This is a test email',
      template: 'reset-password',
      context: {
        name: 'Jibon',
        title: 'Test Email',
      },
    };

    transporter.use('compile', hbs(expressHandlebarsOption()));

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
