import { model, Schema } from 'mongoose';

const ordersSchema = new Schema(
  {
    date: {
      type: Date,
      require: true,
    },
    price: {
      type: String,
      required: true,
    },
    service: {
      type: String,
      required: true,
    },
    userId: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    photo: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const OrdersCollection = model('orders', ordersSchema);
