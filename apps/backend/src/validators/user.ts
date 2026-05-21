import { z } from "zod";

export const CartItemSchema = z.object({
  productId: z.string(),
  variantId: z.string().min(1),
  quantity: z.number().int().min(1).default(1),
});

export const SavedAddressSchema = z.object({
  _id: z.string().optional(),
  name: z.string().min(1),
  country: z.string().min(1),
  city: z.string().min(1),
  street: z.string().min(1),
  apartment: z.string().min(1),
  postalCode: z.string().min(1),
  phone: z.string().min(5),
});

export const UserSchema = z.object({
  _id: z.string().optional(),
  email: z.string().trim().email().min(1),
  password: z.string().min(6),
  name: z.string().min(1).optional(),
  surname: z.string().min(1).optional(),
  
  cart: z.object({
    items: z.array(CartItemSchema).default([]),
  }).default({ items: [] }),
  
  orders: z.array(z.string()).default([]),
  
  favourite: z.array(z.object({
    productId: z.string()
  })).default([]),
  
  myProducts: z.array(z.object({
    productId: z.string()
  })).default([]),
  
  address: z.array(SavedAddressSchema).default([]),
  
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type User = z.infer<typeof UserSchema>;

export const RegisterFormSchema = z.object({
  email: UserSchema.shape.email,
  password: UserSchema.shape.password,
  confirmPassword: z.string().min(1),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Incorrect passwords',
  path: ['confirmPassword'],
});

export type RegisterFormValues = z.infer<typeof RegisterFormSchema>;

export const LoginFormSchema = z.object({
  email: UserSchema.shape.email,
  password: z.string().min(1),
});

export type LoginFormValues = z.infer<typeof LoginFormSchema>;
