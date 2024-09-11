import express from 'express';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { authenticate } from '../middlewares/authenticate.js';
import { orderSchema } from '../validation/orders.js';
import {
  createOrderController,
  getOrdersController,
} from '../controllers/orders.js';

const router = express.Router();
const parseJSON = express.json({
  type: ['application/json', 'application/vnd.api+json'],
  limit: '100kb',
});

router.use(authenticate);

router.get('/', ctrlWrapper(getOrdersController));

router.post(
  '/',
  parseJSON,
  validateBody(orderSchema),
  ctrlWrapper(createOrderController),
);

export default router;
