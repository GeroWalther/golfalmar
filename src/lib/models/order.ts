import { Schema, model, models, type InferSchemaType, type Model } from "mongoose";

const ShippingAddressSchema = new Schema(
  {
    line1: String,
    line2: String,
    city: String,
    postal_code: String,
    state: String,
    country: String,
  },
  { _id: false },
);

const OrderItemSchema = new Schema(
  {
    productId: { type: String, required: true },
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    unitAmountCents: { type: Number, required: true },
  },
  { _id: false },
);

const OrderSchema = new Schema(
  {
    stripeSessionId: { type: String, required: true, unique: true, index: true },
    stripePaymentIntentId: { type: String },
    email: { type: String, required: true, lowercase: true, trim: true },
    name: { type: String, trim: true },
    shippingAddress: ShippingAddressSchema,
    items: { type: [OrderItemSchema], required: true },
    amountTotalCents: { type: Number, required: true },
    shippingCents: { type: Number, default: 0 },
    currency: { type: String, default: "eur" },
    locale: { type: String, enum: ["en", "de", "es"], default: "en" },
    status: {
      type: String,
      enum: ["paid", "fulfilled", "cancelled", "refunded"],
      default: "paid",
      index: true,
    },
    trackingNumber: { type: String, trim: true },
    trackingUrl: { type: String, trim: true },
    shippedAt: { type: Date },
    confirmationSentAt: { type: Date },
    shippedNotificationSentAt: { type: Date },
  },
  { timestamps: true },
);

export type OrderDoc = InferSchemaType<typeof OrderSchema> & {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
};

export const Order: Model<OrderDoc> =
  (models.Order as Model<OrderDoc>) || model<OrderDoc>("Order", OrderSchema);
