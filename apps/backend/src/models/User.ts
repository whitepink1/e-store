const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
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
        required: true,
    },
    surname: {
        type: String,
        required: true,
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
    orders: [{
        type: Schema.Types.ObjectId,
        ref: 'Order'
    }],
    favourite: [{
        productId: { 
            type: Schema.Types.ObjectId, 
            ref: 'Product', 
            required: true 
        }
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

module.exports = mongoose.model('User', userSchema);