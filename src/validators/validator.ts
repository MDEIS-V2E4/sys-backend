import { Request, Response, NextFunction } from 'express';
import { saleSchema } from './schema/sale.schema';
import { clientSchema } from './schema/client.schema';
import { employeeSchema,statusEmployeeSchema } from './schema/employee.schema';
import { productSchema,statusProductSchema } from './schema/product.schema';

export const validateShema = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { baseUrl,originalUrl } = req;
    const valid: any = {
      '/v1/sale': saleSchema,
      '/v1/client': clientSchema,
      '/v1/employee': employeeSchema,
      '/v1/product': productSchema,
    };

    const statusEmployeeEndpoint = /^\/v1\/employee\/toggle-status\/.+$/;
    const statusProductEndpoint = /^\/v1\/product\/toggle-status\/.+$/;

    const schema = valid[baseUrl] || null;
    if (statusEmployeeEndpoint.test(originalUrl)) {
      const statusValidation = statusEmployeeSchema.safeParse(req.body);
      if (!statusValidation.success) {
        res.status(400).json({ error: statusValidation.error.errors });
        return;
      }
    }else if(statusProductEndpoint.test(originalUrl)){
      const statusValidation = statusProductSchema.safeParse(req.body);
      if (!statusValidation.success) {
        res.status(400).json({ error: statusValidation.error.errors });
        return;
      }
    }
    else{
      if (!schema) {
        res.status(400).json({ error: 'schema not found' });
        return;
      }
  
      const parsed = schema.safeParse(req.body);
      if (!parsed.success) {
        res.status(400).json({ error: parsed.error.errors });
        return;
      }
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
};
