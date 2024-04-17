import { EngineOptions } from 'express-handlebars/types';
import { NodemailerExpressHandlebarsOptions } from 'nodemailer-express-handlebars';
import path from 'path';

export const expressHandlebarsOption =
  (): NodemailerExpressHandlebarsOptions => ({
    viewEngine: {
      extname: '.hbs',
      layoutsDir: path.join(__dirname, '../views/layouts'),
      partialsDir: path.join(__dirname, '../views/partials'),
      defaultLayout: 'default',
    } as EngineOptions,
    viewPath: path.join(__dirname, '../views/emails'),
    extName: '.hbs',
  });
