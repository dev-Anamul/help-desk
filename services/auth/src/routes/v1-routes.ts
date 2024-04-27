import { Router } from 'express';
import * as authControllers from '../api';
import { authenticate } from '@/middlewares/authenticate';

const router = Router();

router.post('/signup', authControllers.signupHandler);
router.post('/login', authControllers.loginHandler);
router.post('/forgot-password', authControllers.forgotPasswordHandler);
router.post('/reset-password', authControllers.resetPasswordHandler);
router.patch('/change-password', authControllers.changePasswordHandler);
router.patch('/update-profile', authControllers.updateProfileHandler);
router.get('/me', authControllers.userInfoHandler);
router.delete('/delete-account', authControllers.deleteAccountHandler);
router.post('/verify-token', authControllers.verifyTokenHandler);

export default router;
