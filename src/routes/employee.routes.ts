import { Router } from 'express';
import { validateShema } from '../validators/validator';
import { getEmployeeByIdController, getEmployeeListController,registerEmployeeController, toggleStatusEmployeeController, updateEmployeeController} from '../controllers/employee.controller';

const router = Router();

router.get('/list', getEmployeeListController);
router.post('/', validateShema, registerEmployeeController);
router.get('/id/:id', getEmployeeByIdController);
router.put('/:id', validateShema, updateEmployeeController);
router.put('/toggle-status/:id', validateShema,toggleStatusEmployeeController);

export default router;