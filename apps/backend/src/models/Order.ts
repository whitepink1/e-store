import { Schema, model, models } from "mongoose";

const orderSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    products: [{
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
            min: 1
        },
        price: {
            type: Number,
            required: true
        }
    }],
    address: {
        country: { type: String, required: true },
        city: { type: String, required: true },
        street: { type: String, required: true },
        apartment: { type: String, required: true },
        postalCode: { type: String, required: true },
        phone: { type: String, required: true },
        name: { type: String, required: true }
    },
    shipment: {
        type: String,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Paid', 'Shipped', 'Delivered', 'Cancelled'],
        default: 'Pending'
    },
    stripeSessionId: { type: String }
}, { timestamps: true });

export const Order = models.Order || model('Order', orderSchema);