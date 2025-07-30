import { inject, injectable } from "tsyringe";
import { IDocumentTypeRepository } from "../repositories/IDocumentTypeRepository";
import { ErrorHandler } from "../../../shared/errors/ErrorHandler";

@injectable()
export class DeleteDocumentTypeUseCase {
    constructor(
        @inject('DocumentTypeRepository')
        private readonly documentTypeRepository: IDocumentTypeRepository
    ) { }

    async execute(id: string): Promise<void> {
        const document = await this.documentTypeRepository.getById(id)

        if (!document) throw new ErrorHandler("Document type not found", 404);

        await this.documentTypeRepository.delete(id);
    }
}