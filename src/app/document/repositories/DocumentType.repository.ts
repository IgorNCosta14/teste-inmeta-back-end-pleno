import { IsNull, Repository } from "typeorm";
import { AppDataSource } from "../../../config/typeOrm/dataSource";
import { IDocumentTypeRepository } from "./IDocumentTypeRepository";
import { DocumentType } from "../entities/DocumentType.entity"
import { CreateDocumentTypeDto } from "../dtos/CreateDocumentType.dto";

export class DocumentTypeRepository implements IDocumentTypeRepository {
    private readonly documentTypeRepository: Repository<DocumentType>;

    constructor() {
        this.documentTypeRepository = AppDataSource.getRepository(DocumentType);
    }

    async create(data: CreateDocumentTypeDto): Promise<DocumentType> {
        const createDocumentType = this.documentTypeRepository.create(data);

        return await this.documentTypeRepository.save(createDocumentType);
    }

    async getByName(name: string): Promise<DocumentType | null> {
        return await this.documentTypeRepository.findOne({
            where: {
                name
            }
        })
    }

    async getById(id: string): Promise<DocumentType | null> {
        return await this.documentTypeRepository.findOne({
            where: {
                id
            }
        })
    }

    async listActive(): Promise<DocumentType[]> {
        return await this.documentTypeRepository.find({
            where: { deletedAt: IsNull() },
        })
    }

    async delete(id: string): Promise<void> {
        await this.documentTypeRepository.softDelete(id);
    }

}