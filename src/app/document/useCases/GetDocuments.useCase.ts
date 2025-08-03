import { inject, injectable } from "tsyringe";
import { IDocumentRepository } from "../repositories/IDocumentRepository";
import { ListDocumentsFiltersDto } from "../dtos/ListDocumentsFilters.dto";
import { ListDocumentsRespDto } from "../dtos/ListDocumentsResp.dto";

@injectable()
export class GetDocumentsUseCase {
    constructor(
        @inject('DocumentRepository')
        private readonly documentRepository: IDocumentRepository
    ) { }

    async execute(filters: ListDocumentsFiltersDto): Promise<ListDocumentsRespDto> {
        return await this.documentRepository.listPendingDocuments(filters);
    }
}