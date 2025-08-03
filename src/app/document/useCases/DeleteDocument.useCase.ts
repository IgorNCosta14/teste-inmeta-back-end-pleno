import { inject, injectable } from "tsyringe";
import { IDocumentRepository } from "../repositories/IDocumentRepository";
import { ErrorHandler } from "../../../shared/errors/ErrorHandler";

@injectable()
export class DeleteDocumentUseCase {
    constructor(
        @inject('DocumentRepository')
        private readonly documentRepository: IDocumentRepository,
    ) { }
    async execute(ids: string[]): Promise<void> {
        if (!ids.length) {
            throw new ErrorHandler("No document IDs provided", 400);
        }

        const idsNotFound: string[] = [];

        for (const id of ids) {
            const document = await this.documentRepository.getById(id);

            if (!document) {
                idsNotFound.push(id);
            }
        }

        if (idsNotFound.length > 0) throw new ErrorHandler("Documents not found", 404, { idsNotFound });

        await this.documentRepository.delete(ids);
    }
}