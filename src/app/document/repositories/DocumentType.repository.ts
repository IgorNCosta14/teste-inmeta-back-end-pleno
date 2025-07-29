import { Repository } from "typeorm";
import { AppDataSource } from "../../../config/typeOrm/dataSource";
import { IDocumentTypeRepository } from "./IDocumentTypeRepository";
import { DocumentType } from "../entities/DocumentType.entity"

export class DocumentTypeRepository implements IDocumentTypeRepository {
    private readonly documentTypeRepository: Repository<DocumentType>;

    constructor() {
        this.documentTypeRepository = AppDataSource.getRepository(DocumentType);
    }
}