import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UpdateEmployeeUseCase } from '../useCases/UpdateEmployee.useCase';

export class UpdateEmployeeEmployeeController {
    async handle(req: Request, res: Response): Promise<Response> {
        const { name, hiredAt } = req.body;
        const { id } = req.params;

        const updateEmployeeUseCase = container.resolve(UpdateEmployeeUseCase);
        const employee = await updateEmployeeUseCase.execute({
            id: id as string,
            name,
            hiredAt
        });

        return res.status(200).send({
            status: 200,
            message: 'Employee updated successfully',
            data: {
                employee
            }
        });
    }
}