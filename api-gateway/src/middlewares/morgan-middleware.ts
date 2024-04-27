import { logger } from '@/utils';
import morgan from 'morgan';

export const morganMiddleware = morgan(
  ':method :url :status :res[content-length] - :response-time ms :remote-addr - :remote-user ":referrer" ":user-agent" :req[header] :res[header] :req[body] :res[body] :http-version',
  {
    stream: {
      write: (message) => logger.http(message.trim()),
    },
  }
);
