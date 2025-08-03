import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListDocumentTypeUseCase } from '../useCases/ListDocumentType.useCase';

export class ListDocumentTypeController {
    async handle(req: Request, res: Response): Promise<Response> {
        const listDocumentTypeUseCase = container.resolve(ListDocumentTypeUseCase);
        const documentTypes = await listDocumentTypeUseCase.execute()

        return res.status(200).send({
            status: 200,
            message: 'Document types fetched successfully',
            data: {
                documentTypes
            }
        });
    }
}