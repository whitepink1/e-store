import { z } from 'zod';

export const orderValidationSchema = z.object({
  _id: z.string().optional(),
  userId: z.string(),
  products: z.array(
    z.object({
      productId: z.string(),
      variantId: z.string(),
      quantity: z.number().int().min(1),
      price: z.number().positive(),
    })
  ),
  address: z.object({
    country: z.string(),
    city: z.string(),
    street: z.string(),
    apartment: z.string(),
    postalCode: z.string(),
    phone: z.string(),
    name: z.string(),
  }),
  shipment: z.string(),
  totalPrice: z.number().positive(),
  status: z.enum(['Pending', 'Paid', 'Shipped', 'Delivered', 'Cancelled']).default('Pending'),
  stripeSessionId: z.string().optional(),
  createdAt: z.string().optional(),
});

export type OrderInputProps = z.infer<typeof orderValidationSchema>;