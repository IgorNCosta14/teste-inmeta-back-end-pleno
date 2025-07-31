import { CreateDocumentDto } from "../dtos/CreateDocument.dto";
import { ListDocumentsFiltersDto } from "../dtos/ListDocumentsFilters.dto";
import { ListDocumentsRespDto } from "../dtos/ListDocumentsResp.dto";
import { Document } from "../entities/Document.entity";

export interface IDocumentRepository {
    create(data: CreateDocumentDto): Promise<Document>;
    getByEmployeeId(employeeId: string): Promise<Document[]>;
    delete(id: string): Promise<void>;
    listPendingDocuments(filters: ListDocumentsFiltersDto): Promise<ListDocumentsRespDto>
}