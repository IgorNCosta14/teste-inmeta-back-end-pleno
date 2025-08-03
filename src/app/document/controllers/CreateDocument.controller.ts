import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateDocumentUseCase } from '../useCases/CreateDocument.useCase';

export class CreateDocumentController {
    async handle(req: Request, res: Response): Promise<Response> {
        const { documents } = req.body;

        const createDocumentUseCase = container.resolve(CreateDocumentUseCase);
        const document = await createDocumentUseCase.execute(documents)

        return res.status(201).send({
            status: 201,
            message: 'Document created successfully',
            data: {
                documents: document
            }
        });
    }
}