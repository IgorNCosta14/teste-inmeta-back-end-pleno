import { Router } from "express";
import { CreateEmployeeController } from "../../app/employee/controllers/CreateEmployee.controller";
import { createValidationMiddleware } from "../../shared/middlewares/createValidation.middleware";
import { CreateEmployeeBodyDto } from "../../app/employee/dtos/CreateEmployeeBody.dto";
import { UpdateEmployeeEmployeeController } from "../../app/employee/controllers/UpdateEmployee.controller";
import { UpdateEmployeeParamsDto } from "../../app/employee/dtos/UpdateEmployeeParams.dto";

const employeesRouter = Router();

const createEmployeeController = new CreateEmployeeController();
const updateEmployeeEmployeeController = new UpdateEmployeeEmployeeController();

employeesRouter.post('/', createValidationMiddleware(CreateEmployeeBodyDto), createEmployeeController.handle);
employeesRouter.put('/:id', createValidationMiddleware(UpdateEmployeeParamsDto, 'params'), updateEmployeeEmployeeController.handle);

export { employeesRouter };