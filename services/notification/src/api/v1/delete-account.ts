import { expressHandlebarsOption } from '@/utils/express-handlebars-option';
import { transporter } from '@/utils/transporter';
import hbs from 'nodemailer-express-handlebars';

export const deleteAccountEmailHandler = async () => {
  try {
    const mailOptions = {
      from: 'anamul@gmail.com',
      to: 'jibon@gmail.com',
      subject: 'Test email',
      // text: 'This is a test email',
      template: 'delete-account',
      context: {
        name: 'Jibon',
        title: 'Test Email',
      },
    };

    transporter.use('compile', hbs(expressHandlebarsOption()));

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(error);
  }
};
