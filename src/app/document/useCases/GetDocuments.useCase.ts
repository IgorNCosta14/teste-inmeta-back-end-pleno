import { inject, injectable } from "tsyringe";
import { IDocumentRepository } from "../repositories/IDocumentRepository";
import { Document } from "../entities/Document.entity";
import { ListDocumentsFiltersDto } from "../dtos/ListDocumentsFilters.dto";
import { ListDocumentsRespDto } from "../dtos/ListDocumentsResp.dto";

@injectable()
export class GetDocumentsUseCase {
    constructor(
        @inject('DocumentRepository')
        private readonly documentRepository: IDocumentRepository
    ) { }

    async execute(filters: ListDocumentsFiltersDto): Promise<ListDocumentsRespDto> {
        const documents = await this.documentRepository.listPendingDocuments(filters);

        return documents;
    }
}