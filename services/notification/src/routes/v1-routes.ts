import { Router } from 'express';

import * as emailController from '../api';

const router = Router();

router.post('/reset-password', emailController.resetPasswordEmailHandler);

export default router;
