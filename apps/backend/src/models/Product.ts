import { Schema, model, models } from "mongoose";

const VariantSchema = new Schema({
  id: { type: String, required: true },
  color: { type: String, required: true },
  storage: { type: Number }, // Optional (PC, Phones)
  ram: { type: Number },     // Optional PC
  price: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  finalPrice: { type: Number, required: true },
  stock: { type: Number, required: true, default: 0 },
  images: [{ type: String, required: true }]
}, { _id: false });

const SpecificationSchema = new Schema({
  groupName: { type: String, required: true }, // Screen
  specs: [{
    name: { type: String, required: true },   // Diagonal
    value: { type: String, required: true }   // 6.7
  }]
}, { _id: false });


const ProductMongooseSchema = new Schema({
  category: { 
    type: String, 
    required: true, 
    enum: ["smartphones", "smartwatches", "cameras", "headphones", "computers", "gaming"],
    index: true 
  },
  title: { type: String, required: true },
  brand: { type: String, required: true, index: true },
  slug: { type: String, required: true, unique: true },
  shortDescription: { type: String, required: true },
  mainDescription: { type: String, required: true },
  filterAttributes: { 
    type: Schema.Types.Mixed, 
    required: true 
  },
  specifications: [SpecificationSchema],
  variants: [VariantSchema]
}, { 
  timestamps: true
});


ProductMongooseSchema.index({ "filterAttributes": 1 });
ProductMongooseSchema.index({ "variants.finalPrice": 1 });
ProductMongooseSchema.index({ "variants.storage": 1 });

export const Product = models.Product || model("Product", ProductMongooseSchema);