import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateEmployeeUseCase } from '../useCases/CreateEmployee.useCase';

export class CreateEmployeeController {
    async handle(req: Request, res: Response): Promise<Response> {
        const { name, hiredAt } = req.body;

        const createEmployeeUseCase = container.resolve(CreateEmployeeUseCase);
        const employee = await createEmployeeUseCase.execute({
            name,
            hiredAt
        });

        return res.status(201).send({
            status: 201,
            message: 'Employee created successfully',
            data: {
                employee
            }
        });
    }
}