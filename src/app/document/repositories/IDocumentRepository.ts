import { CreateDocumentDto } from "../dtos/CreateDocument.dto";
import { Document } from "../entities/Document.entity";

export interface IDocumentRepository {
    create(data: CreateDocumentDto): Promise<Document>
}