import { Router } from 'express';
import { getProductListController, getProductController, registerProductController, updateProductController, toggleStatusProductController } from '../controllers/product.controller';
import { validateShema } from '../validators/validator';

const router = Router();

router.get('/list', getProductListController);
router.post('/', validateShema, registerProductController);
router.get('/:id', getProductController);
router.put('/:id', validateShema, updateProductController);
router.put('/toggle-status/:id', validateShema,toggleStatusProductController);

export default router;
