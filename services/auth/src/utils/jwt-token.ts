import jwt from 'jsonwebtoken';

type tokenPayload = {
  id: string;
  usernameOrEmail: string;
  role: string;
};

export const generateToken = (payload: tokenPayload) => {
  return jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRES_IN,
    algorithm: 'HS256',
  });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET as string, {
    algorithms: ['HS256'],
  });
};
