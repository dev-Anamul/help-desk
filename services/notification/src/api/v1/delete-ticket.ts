import { expressHandlebarsOption } from '@/utils/express-handlebars-option';
import { transporter } from '@/utils/transporter';
import hbs from 'nodemailer-express-handlebars';

export const deleteTicketEmailHandler = async () => {
  try {
    const mailOptions = {
      from: 'anamul@gmail.com',
      to: 'anamuljibon522@gmail.com',
      subject: 'Test email',
      // text: 'This is a test email',
      template: 'emailTemplate',
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
