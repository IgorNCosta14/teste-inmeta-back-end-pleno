import { CreateDocumentDto } from "../dtos/CreateDocument.dto";
import { ListDocumentsFiltersDto } from "../dtos/ListDocumentsFilters.dto";
import { ListDocumentsRespDto } from "../dtos/ListDocumentsResp.dto";
import { Document } from "../entities/Document.entity";

export interface IDocumentRepository {
    create(data: CreateDocumentDto): Promise<Document>;
    getByEmployeeId(employeeId: string): Promise<Document[]>;
    delete(ids: string[]): Promise<void>;
    listPendingDocuments(filters: ListDocumentsFiltersDto): Promise<ListDocumentsRespDto>;
    getById(id: string): Promise<Document | null>;
    update(data: Document): Promise<Document>;
}