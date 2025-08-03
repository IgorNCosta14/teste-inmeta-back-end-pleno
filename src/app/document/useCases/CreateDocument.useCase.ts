import { inject, injectable } from "tsyringe";
import { IDocumentRepository } from "../repositories/IDocumentRepository";
import { Document } from "../entities/Document.entity";
import { IDocumentTypeRepository } from "../repositories/IDocumentTypeRepository";
import { IEmployeeRepository } from "../../employee/repositories/IEmployeeRepository";
import { ErrorHandler } from "../../../shared/errors/ErrorHandler";
import { DocumentStatus } from "../enums/DocumentStatus.enum";
import { CreateDocumentUseCaseDto } from "../dtos/CreateDocumentUseCase.dto";

@injectable()
export class CreateDocumentUseCase {
    constructor(
        @inject('DocumentRepository')
        private readonly documentRepository: IDocumentRepository,

        @inject('DocumentTypeRepository')
        private readonly documentTypeRepository: IDocumentTypeRepository,

        @inject('EmployeeRepository')
        private readonly employeeRepository: IEmployeeRepository
    ) { }

    async execute(documents: CreateDocumentUseCaseDto[]): Promise<Partial<Document>[]> {
        const validationErrors: { index: number; reason: string }[] = [];

        for (let i = 0; i < documents.length; i++) {
            const { employeeId, documentTypeId } = documents[i];

            const employee = await this.employeeRepository.getById(employeeId);
            const documentType = await this.documentTypeRepository.getById(documentTypeId);

            if (!employee) {
                validationErrors.push({ index: i, reason: `Employee ${employeeId} not found` });
            }

            if (!documentType) {
                validationErrors.push({ index: i, reason: `DocumentType ${documentTypeId} not found` });
            }
        }

        if (validationErrors.length > 0) {
            throw new ErrorHandler("Some of the data is wrong", 400, { errors: validationErrors });
        }

        const createdDocuments: Partial<Document>[] = [];

        for (const doc of documents) {
            const document = await this.documentRepository.create({
                name: doc.name,
                status: doc.url ? DocumentStatus.SENT : DocumentStatus.PENDING,
                url: doc.url,
                employeeId: doc.employeeId,
                documentTypeId: doc.documentTypeId
            });

            createdDocuments.push({
                id: document.id,
                name: document.name,
                status: document.status,
                employee: document.employee,
                documentType: document.documentType,
                createdAt: document.createdAt,
                updatedAt: document.updatedAt,
            });
        }

        return createdDocuments;
    }
}