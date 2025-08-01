import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { DeleteDocumentUseCase } from '../useCases/DeleteDocument.useCase';

export class DeleteDocumentController {
    async handle(req: Request, res: Response): Promise<Response> {
        const { ids } = req.body;

        const deleteDocumentUseCase = container.resolve(DeleteDocumentUseCase);
        await deleteDocumentUseCase.execute(ids);

        return res.status(200).send({
            status: 200,
            message: 'Document delete successfully'
        });
    }
}