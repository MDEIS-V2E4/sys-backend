import { Router } from 'express';
import { validateShema } from '../validators/validator';
import { registerClientController, getClientController, getClientListController, deleteClientController } from '../controllers/client.controller';

const router = Router();

router.post('/', validateShema, registerClientController);
router.get('/list', getClientListController);
router.get('/:cinit', getClientController);
router.delete('/:id', deleteClientController);

export default router;
