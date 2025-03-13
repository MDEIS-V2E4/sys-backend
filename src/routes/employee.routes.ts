import { Router } from 'express';
import { validateShema } from '../validators/validator';
import { getEmployeeListController,registerEmployeeController} from '../controllers/employee.controller';

const router = Router();

router.get('/list', getEmployeeListController);
router.post('/', validateShema, registerEmployeeController);

export default router;