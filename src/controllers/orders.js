import { createOrder, getOrders } from '../services/orders.js';

export const createOrderController = async (req, res) => {
  const orderData = {
    ...req.body,
    userId: req.user._id,
  };
  const order = await createOrder(orderData);

  res.status(201).json({
    status: 201,
    message: `Successfully created a order!`,
    data: order,
  });
};

export const getOrdersController = async (req, res) => {
  const orders = await getOrders({
    userId: req.user._id,
  });

  res.status(200).json({
    status: 200,
    message: `Success!`,
    data: orders,
  });
};
