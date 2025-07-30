import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateDocumentTypeUseCase } from '../useCases/CreateDocumentType.useCase';

export class CreateDocumentTypeController {
    async handle(req: Request, res: Response): Promise<Response> {
        const { name } = req.body;

        const createDocumentTypeUseCase = container.resolve(CreateDocumentTypeUseCase);
        const documentType = await createDocumentTypeUseCase.execute({
            name
        })

        return res.status(201).send({
            status: 201,
            message: 'Document type created successfully',
            data: {
                documentType
            }
        });
    }
}