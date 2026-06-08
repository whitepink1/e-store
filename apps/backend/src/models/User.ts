import { Schema, model, models } from "mongoose";

const UserMongooseSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
    },
    surname: {
        type: String,
    },
    cart: {
        items: [{
            productId: {
                type: Schema.Types.ObjectId, 
                ref: 'Product', 
                required: true 
            },
            variantId: { 
                type: String,
                required: true 
            }, 
            quantity: { 
                type: Number, 
                required: true,
                min: 1,
                default: 1
            }
        }]
    },
    favourite: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'Product' 
    }],
    myProducts: [{
        productId: {
            type: Schema.Types.ObjectId, 
            ref: 'Product', 
            required: true 
        }
    }],
    address: [{
        name: { type: String, required: true },
        country: { type: String, required: true },
        city: { type: String, required: true },
        street: { type: String, required: true },
        apartment: { type: String, required: true },
        postalCode: { type: String, required: true },
        phone: { type: String, required: true }
    }]
},{ timestamps: true });

export const User = models.User || model('User', UserMongooseSchema);