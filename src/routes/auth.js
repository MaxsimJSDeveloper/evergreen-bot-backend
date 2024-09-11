import express from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  loginUserSchema,
  registerUserSchema,
  updateUserSchema,
} from '../validation/auth.js';
import {
  loginUserController,
  refreshUserSessionController,
  registerUserController,
  updateUserController,
} from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBody.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = express.Router();
const parseJSON = express.json();

router.post(
  '/register',
  parseJSON,
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);

router.post(
  '/login',
  parseJSON,
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController),
);

router.patch(
  '/update-user-data',
  parseJSON,
  authenticate,
  validateBody(updateUserSchema),
  ctrlWrapper(updateUserController),
);

router.post('/refresh', parseJSON, ctrlWrapper(refreshUserSessionController));

export default router;
