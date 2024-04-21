import { expressHandlebarsOption } from '@/utils/express-handlebars-option';
import { transporter } from '@/utils/transporter';
import hbs from 'nodemailer-express-handlebars';

export const welcomeEmailHandler = async () => {
  const mailOptions = {
    from: 'anamul@gmail.com',
    to: 'anamuljibon522@gmail.com',
    subject: 'Test email',
    // text: 'This is a test email',
    template: 'welcome',
    context: {
      name: 'Jibon',
      title: 'Test Email',
    },
  };

  transporter.use('compile', hbs(expressHandlebarsOption()));

  await transporter.sendMail(mailOptions);
};
