import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListEmployeesUseCase } from '../useCases/ListEmployees.useCase';

export class ListEmployeesController {
    async handle(req: Request, res: Response): Promise<Response> {
        const { page, limit, order } = req.validatedQuery;

        const listEmployeesUseCase = container.resolve(ListEmployeesUseCase);
        const employees = await listEmployeesUseCase.execute({ page, limit, order });

        return res.status(200).send({
            status: 200,
            message: 'Employees fetched successfully',
            data: {
                employees
            }
        });
    }
}