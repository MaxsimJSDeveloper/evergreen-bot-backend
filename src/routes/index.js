import { Router } from 'express';
import authRouter from './auth.js';
import ordersRouter from './orders.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/orders', ordersRouter);

export default router;
