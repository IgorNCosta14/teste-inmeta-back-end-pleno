import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { GetDocumentsUseCase } from '../useCases/GetDocuments.useCase';

export class GetDocumentsController {
    async handle(req: Request, res: Response): Promise<Response> {
        const {
            employeeId,
            documentTypeId,
            page,
            limit,
            status,
            order
        } = req.validatedQuery;

        const getDocumentsUseCase = container.resolve(GetDocumentsUseCase);
        const documents = await getDocumentsUseCase.execute({
            employeeId,
            documentTypeId,
            page,
            limit,
            status,
            order
        });

        return res.status(200).send({
            status: 200,
            message: 'Documents fetched successfully',
            data: {
                documents: documents
            }
        });
    }
}