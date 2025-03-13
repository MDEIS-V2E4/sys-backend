import { Router } from 'express';
import { validateShema } from '../validators/validator';
import {
  registerClientController,
  getClientController,
  getClientListController,
  deleteClientController,
  getClientByIdController,
} from '../controllers/client.controller';

const router = Router();

router.post('/', validateShema, registerClientController);
router.get('/list', getClientListController);
router.get('/id/:id', getClientByIdController);
router.get('/:cinit', getClientController);
router.delete('/:id', deleteClientController);

export default router;
