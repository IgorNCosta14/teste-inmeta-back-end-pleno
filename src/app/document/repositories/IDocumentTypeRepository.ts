import { CreateDocumentTypeDto } from "../dtos/CreateDocumentType.dto";
import { DocumentType } from "../entities/DocumentType.entity";

export interface IDocumentTypeRepository {
    create(data: CreateDocumentTypeDto): Promise<DocumentType>;
    getById(id: string): Promise<DocumentType | null>;
    getByName(name: string): Promise<DocumentType | null>;
    listActive(): Promise<DocumentType[]>;
    delete(id: string): Promise<void>;
}