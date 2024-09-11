import { OrdersCollection } from '../db/models/order.js';

export const createOrder = async (payload) => {
  const order = new OrdersCollection({
    ...payload,
    userId: payload.userId,
  });
  await order.save();
  return order;
};

export const getOrders = async (userId) => {
  const orders = await OrdersCollection.find({ userId });
  return orders;
};
