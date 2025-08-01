import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { SendDocumentUseCase } from '../useCases/SendDocument.useCase';

export class SendDocumentController {
    async handle(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const { url } = req.body;

        const sendDocumentUseCase = container.resolve(SendDocumentUseCase);
        const document = await sendDocumentUseCase.execute({ id, url })

        return res.status(200).send({
            status: 200,
            message: 'Document sent successfully',
            data: {
                document
            }
        });
    }
}