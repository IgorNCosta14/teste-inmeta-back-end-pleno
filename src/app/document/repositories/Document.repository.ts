import { Repository } from "typeorm";
import { AppDataSource } from "../../../config/typeOrm/dataSource";
import { IDocumentRepository } from "./IDocumentRepository";
import { Document } from "../entities/Document.entity";

export class DocumentRepository implements IDocumentRepository {
    private readonly documentRepository: Repository<Document>;

    constructor() {
        this.documentRepository = AppDataSource.getRepository(Document);
    }
}