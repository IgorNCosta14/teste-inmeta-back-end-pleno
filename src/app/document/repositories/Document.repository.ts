import { Repository } from "typeorm";
import { AppDataSource } from "../../../config/typeOrm/dataSource";
import { IDocumentRepository } from "./IDocumentRepository";
import { Document } from "../entities/Document.entity";
import { CreateDocumentDto } from "../dtos/CreateDocument.dto";

export class DocumentRepository implements IDocumentRepository {
    private readonly documentRepository: Repository<Document>;

    constructor() {
        this.documentRepository = AppDataSource.getRepository(Document);
    }

    async create(data: CreateDocumentDto): Promise<Document> {
        const createDocument = this.documentRepository.create(data);

        return await this.documentRepository.save(createDocument);
    }
}