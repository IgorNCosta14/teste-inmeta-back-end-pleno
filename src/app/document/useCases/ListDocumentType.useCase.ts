import { inject, injectable } from "tsyringe";
import { IDocumentTypeRepository } from "../repositories/IDocumentTypeRepository";
import { DocumentType } from "../entities/DocumentType.entity";

@injectable()
export class ListDocumentTypeUseCase {
    constructor(
        @inject('DocumentTypeRepository')
        private readonly documentTypeRepository: IDocumentTypeRepository
    ) { }

    async execute(): Promise<DocumentType[]> {
        return await this.documentTypeRepository.listActive()
    }
}