import { Router } from 'express';
import { validateShema } from '../validators/validator';
import {
  registerClientController,
  getClientController,
  getClientListController,
  deleteClientController,
  getClientByIdController,
  updateClientController,
} from '../controllers/client.controller';

const router = Router();

router.get('/list', getClientListController);
router.get('/id/:id', getClientByIdController);
router.get('/:cinit', getClientController);
router.post('/', validateShema, registerClientController);
router.put('/:id', validateShema, updateClientController);
router.delete('/:id', deleteClientController);

export default router;
