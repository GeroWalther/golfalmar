import { Schema, model, models, type InferSchemaType, type Model } from "mongoose";

// Per-product shop state the admin can change without a deploy. The catalog
// itself (price, images, copy) stays hardcoded in lib/products.ts.
const ProductStatusSchema = new Schema(
  {
    productId: { type: String, required: true, unique: true, index: true },
    soldOut: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export type ProductStatusDoc = InferSchemaType<typeof ProductStatusSchema>;

export const ProductStatus: Model<ProductStatusDoc> =
  (models.ProductStatus as Model<ProductStatusDoc>) ||
  model<ProductStatusDoc>("ProductStatus", ProductStatusSchema);
