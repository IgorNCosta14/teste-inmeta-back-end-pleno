import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListEmployeesDocumentsUseCase } from '../useCases/ListEmployeesDocuments.useCase';

export class ListEmployeesDocumentsController {
    async handle(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;

        const listEmployeesDocumentsUseCase = container.resolve(ListEmployeesDocumentsUseCase);
        const employee = await listEmployeesDocumentsUseCase.execute(id);

        return res.status(200).send({
            status: 200,
            message: 'Employees fetched successfully',
            data: {
                employee
            }
        });
    }
}