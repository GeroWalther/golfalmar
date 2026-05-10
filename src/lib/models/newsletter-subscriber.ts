import { Schema, model, models, type InferSchemaType, type Model } from "mongoose";

const NewsletterSubscriberSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    name: { type: String, trim: true, maxlength: 120 },
    locale: { type: String, enum: ["en", "de", "es"], default: "en" },
    source: { type: String, default: "home", maxlength: 60 },
    status: {
      type: String,
      enum: ["subscribed", "unsubscribed"],
      default: "subscribed",
      index: true,
    },
    discountCode: { type: String, trim: true, index: true },
    stripePromotionCodeId: { type: String },
    discountIssuedAt: { type: Date },
    discountUsedAt: { type: Date },
    welcomeEmailSentAt: { type: Date },
  },
  { timestamps: true },
);

export type NewsletterSubscriberDoc = InferSchemaType<
  typeof NewsletterSubscriberSchema
> & {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
};

export const NewsletterSubscriber: Model<NewsletterSubscriberDoc> =
  (models.NewsletterSubscriber as Model<NewsletterSubscriberDoc>) ||
  model<NewsletterSubscriberDoc>(
    "NewsletterSubscriber",
    NewsletterSubscriberSchema,
  );
