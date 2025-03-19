import { z } from 'zod';

export const productSchema = z.object({
  id: z.number().optional(),
  code: z
    .string()
    .min(1, { message: 'El código es obligatorio' })
    .max(50, { message: 'El código no puede tener más de 50 caracteres' }),
  name: z
    .string()
    .min(1, { message: 'El nombre es obligatorio' })
    .max(100, { message: 'El nombre no puede tener más de 100 caracteres' }),
  price: z
    .number()
    .min(0.01, { message: 'El precio debe ser mayor que cero' }),
  status: z
    .enum(['Active', 'Inactive'])
    .default('Active')
    .optional(),
});

export const statusProductSchema = z.object({
  status: z
    .enum(['Active', 'Inactive'])
    .refine((val) => val !== null, {
      message: 'El estado es obligatorio',
    }),
});