// import { z } from 'zod';

// export const OrderProductItemSchema = z.object({
//   productId: z.string().min(1, 'Product ID is required'),
//   variantId: z.string().min(1, 'Variant ID is required'),
//   quantity: z.number().int().min(1, 'Quantity must be at least 1'),
//   price: z.number().positive('Price must be greater than 0'),
// });

// export const OrderAddressSchema = z.object({
//   country: z.string().min(1, 'Country is required'),
//   city: z.string().min(1, 'City is required'),
//   street: z.string().min(1, 'Street is required'),
//   apartment: z.string().min(1, 'Apartment/House # is required'),
//   postalCode: z.string().min(1, 'Postal code is required'),
//   phone: z.string().min(5, 'Phone number is too short'),
//   recipientName: z.string().min(1, 'Recipient name is required'),
// });

// export const OrderSchema = z.object({
//   _id: z.string().optional(),
//   userId: z.string().optional(),
//   products: z.array(OrderProductItemSchema).min(1, 'Order must contain at least one product'),
//   address: OrderAddressSchema,
//   shipment: z.string().min(1, 'Shipment method is required'),
//   totalPrice: z.number().nonnegative('Total price cannot be negative'),
//   status: z.enum(['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'])
//     .default('Pending'),
//   createdAt: z.date().optional(),
//   updatedAt: z.date().optional(),
// });

// export type Order = z.infer<typeof OrderSchema>;
// export type OrderProductItem = z.infer<typeof OrderProductItemSchema>;
// export type OrderAddress = z.infer<typeof OrderAddressSchema>;