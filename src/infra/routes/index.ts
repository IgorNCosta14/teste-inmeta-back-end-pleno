import { Router } from 'express';
import { employeesRouter } from './employees.routes';
import { documentTypeRouter } from './documentTypes.routes';
import { documentRouter } from './document.routes';

const router = Router();

router.use('/employees', employeesRouter);
router.use('/document-type', documentTypeRouter);
router.use('/document', documentRouter)

export default router;