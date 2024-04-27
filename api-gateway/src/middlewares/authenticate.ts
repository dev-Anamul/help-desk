import axios from 'axios';

export const authenticate = async (req: any, res: any, next: any) => {
  // Get token from headers
  const token = req.headers?.authorization?.split(' ')[1];

  // Check if token exists
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const response = await axios.post(
      `${process.env.AUTH_SERVICE_URL}/api/v1/verify-token`,
      { token }
    );
    req.user = response?.data?.user;

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};
