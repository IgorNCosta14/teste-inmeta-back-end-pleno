import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { DeleteDocumentTypeUseCase } from '../useCases/DeleteDocumentType.useCase';

export class DeleteDocumentTypeController {
    async handle(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;

        const deleteDocumentTypeUseCase = container.resolve(DeleteDocumentTypeUseCase);
        await deleteDocumentTypeUseCase.execute(id);

        return res.status(200).send({
            status: 200,
            message: 'Document type delete successfully',
        });
    }
}