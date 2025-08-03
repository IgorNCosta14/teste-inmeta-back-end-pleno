import { In, Repository } from "typeorm";
import { AppDataSource } from "../../../config/typeOrm/dataSource";
import { IDocumentRepository } from "./IDocumentRepository";
import { Document } from "../entities/Document.entity";
import { CreateDocumentDto } from "../dtos/CreateDocument.dto";
import { DocumentStatus } from "../enums/DocumentStatus.enum";
import { ListDocumentsFiltersDto } from "../dtos/ListDocumentsFilters.dto";
import { ListDocumentsRespDto } from "../dtos/ListDocumentsResp.dto";

export class DocumentRepository implements IDocumentRepository {
    private readonly documentRepository: Repository<Document>;

    constructor() {
        this.documentRepository = AppDataSource.getRepository(Document);
    }

    async create(data: CreateDocumentDto): Promise<Document> {
        const { employeeId, documentTypeId, ...rest } = data;

        const document = this.documentRepository.create({
            ...rest,
            employee: { id: employeeId },
            documentType: { id: documentTypeId },
        });

        return await this.documentRepository.save(document);
    }

    async getById(id: string): Promise<Document | null> {
        return await this.documentRepository.findOne({
            where: {
                id
            }
        })
    }

    async getByEmployeeId(employeeId: string): Promise<Document[]> {
        return await this.documentRepository.find({
            where: {
                employee: { id: employeeId }
            },
            relations: ['documentType']
        })
    }

    async listPendingDocuments(filters: ListDocumentsFiltersDto): Promise<ListDocumentsRespDto> {
        const {
            employeeId,
            documentTypeId,
            page = 1,
            limit = 10,
            status = DocumentStatus.PENDING,
            order = 'ASC'
        } = filters;

        const query = this.documentRepository
            .createQueryBuilder('document')
            .leftJoinAndSelect('document.employee', 'employee')
            .withDeleted()
            .leftJoinAndSelect('document.documentType', 'documentType')
            .where('document.status = :status', { status })
            .andWhere('document.deleted_at IS NULL');

        if (employeeId) {
            query.andWhere('employee.id = :employeeId', { employeeId });
        }

        if (documentTypeId) {
            query.andWhere('documentType.id = :documentTypeId', { documentTypeId });
        }

        query.orderBy('document.createdAt', order)
            .skip((page - 1) * limit)
            .take(limit);

        const [results, total] = await query.getManyAndCount();

        return {
            data: results,
            total,
            page,
            limit,
            order
        };
    }

    async delete(ids: string[]): Promise<void> {
        await this.documentRepository.softDelete({ id: In(ids) });
    }

    async update(data: Document): Promise<Document> {
        return await this.documentRepository.save(data);
    }
}