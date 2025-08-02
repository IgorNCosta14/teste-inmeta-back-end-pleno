import { Router } from "express";
import { CreateEmployeeController } from "../../app/employee/controllers/CreateEmployee.controller";
import { createValidationMiddleware } from "../../shared/middlewares/createValidation.middleware";
import { CreateEmployeeBodyDto } from "../../app/employee/dtos/CreateEmployeeBody.dto";
import { UpdateEmployeeEmployeeController } from "../../app/employee/controllers/UpdateEmployee.controller";
import { UpdateEmployeeParamsDto } from "../../app/employee/dtos/UpdateEmployeeParams.dto";
import { ListEmployeesController } from "../../app/employee/controllers/ListEmployees.controller";
import { ListEmployeesQueryDto } from "../../app/employee/dtos/ListEmployeesQuery.dto";
import { ListEmployeesDocumentsController } from "../../app/employee/controllers/ListEmployeesDocuments.controller";
import { ListEmployeesDocumentsParamsDto } from "../../app/employee/dtos/ListEmployeesDocumentsParams.dto";
import { UpdateEmployeeBodyDto } from "../../app/employee/dtos/UpdateEmployeeBody.dto";

const employeesRouter = Router();

const createEmployeeController = new CreateEmployeeController();
const updateEmployeeEmployeeController = new UpdateEmployeeEmployeeController();
const listEmployeesDocumentsController = new ListEmployeesDocumentsController();
const listEmployeesController = new ListEmployeesController();

employeesRouter.post('/', createValidationMiddleware(CreateEmployeeBodyDto), createEmployeeController.handle);
employeesRouter.get('/', createValidationMiddleware(ListEmployeesQueryDto, 'query'), listEmployeesController.handle);
employeesRouter.get('/:id',
    createValidationMiddleware(ListEmployeesDocumentsParamsDto, 'params'),
    listEmployeesDocumentsController.handle
);
employeesRouter.put('/:id',
    createValidationMiddleware(UpdateEmployeeParamsDto, 'params'),
    createValidationMiddleware(UpdateEmployeeBodyDto),
    updateEmployeeEmployeeController.handle
);

export { employeesRouter };