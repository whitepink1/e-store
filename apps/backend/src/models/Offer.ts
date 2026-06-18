import { Schema, model, models } from "mongoose";

const OfferMongooseSchema = new Schema({
    _id: {type: Schema.Types.ObjectId},
    name: {
        type: String,
        required: true,
        unique: true,
    },
    items: [{ type: String }],
    dbName: {
        type: String,
    }
});

export const Offer = models.Offer || model('Offer', OfferMongooseSchema, 'offers');