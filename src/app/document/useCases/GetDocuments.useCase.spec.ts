import { Employee } from "../../employee/entities/Employee.entity";
import { ListDocumentsFiltersDto } from "../dtos/ListDocumentsFilters.dto";
import { ListDocumentsRespDto } from "../dtos/ListDocumentsResp.dto";
import { Document } from "../entities/Document.entity";
import { DocumentType } from "../entities/DocumentType.entity";
import { DocumentStatus } from "../enums/DocumentStatus.enum";
import { IDocumentRepository } from "../repositories/IDocumentRepository";
import { GetDocumentsUseCase } from "./GetDocuments.useCase";

describe('GetDocumentsUseCase', () => {
    let getDocumentsUseCase: GetDocumentsUseCase;
    let documentRepository: jest.Mocked<IDocumentRepository>;

    beforeEach(() => {
        documentRepository = {
            listPendingDocuments: jest.fn()
        } as any;

        getDocumentsUseCase = new GetDocumentsUseCase(documentRepository);
    });

    it('should be able to list documents with filter', async () => {
        const filters: ListDocumentsFiltersDto = {
            page: 1,
            limit: 10,
            status: DocumentStatus.PENDING,
            order: 'ASC',
            employeeId: 'valid-employee-id',
            documentTypeId: 'valid-document-type-id-1'
        };

        const mockedResponse: ListDocumentsRespDto = {
            data: [
                {
                    id: 'doc-id',
                    name: 'Doc name',
                    status: DocumentStatus.PENDING,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    documentType: {
                        id: 'valid-document-type-id-1',
                        name: 'document-name'
                    } as DocumentType,
                    employee: {
                        id: 'valid-employee-id',
                        name: 'employee-name'
                    } as Employee
                } as Document
            ],
            total: 1,
            page: 1,
            limit: 10,
            order: "ASC"
        };

        documentRepository.listPendingDocuments.mockResolvedValue(mockedResponse);

        const result = await getDocumentsUseCase.execute(filters);

        expect(documentRepository.listPendingDocuments).toHaveBeenCalledWith(filters);
        expect(result).toEqual(mockedResponse);
    })
})