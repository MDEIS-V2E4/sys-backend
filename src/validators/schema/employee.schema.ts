import { z } from 'zod';

export const employeeSchema = z.object({
  id: z.number().optional(), 
  first_name: z.string().min(1, { message: 'El nombre es obligatorio' }),
  last_name: z.string().min(1, { message: 'El apellido es obligatorio' }),
  email: z
    .string()
    .email({ message: 'El formato del email es inválido' })
    .optional(), 
  phone: z
    .string()
    .max(20, { message: 'El teléfono no puede tener más de 20 caracteres' })
    .optional(), 
  hire_date: z.string().refine(
    (val) => !isNaN(Date.parse(val)),
    { message: 'La fecha de contratación es inválida' }
  ), 
  job_title: z.string().min(1, { message: 'El cargo es obligatorio' }).optional(),
  salary: z
    .number()
    .min(0.01, { message: 'El salario debe ser mayor que cero' })
    .optional(), 
  department_id: z.number().optional(), 
  manager_id: z.number().nullable().optional(),
  status: z.enum(['Active', 'Inactive']).optional(),
});
