import { Router } from 'express';
import { employeesRouter } from './employees.routes';

const router = Router();

router.use('/employees', employeesRouter);

export default router;