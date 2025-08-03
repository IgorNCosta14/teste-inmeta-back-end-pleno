import { ErrorHandler } from "../../../shared/errors/ErrorHandler";
import { Employee } from "../../employee/entities/Employee.entity";
import { IEmployeeRepository } from "../../employee/repositories/IEmployeeRepository";
import { CreateDocumentUseCaseDto } from "../dtos/CreateDocumentUseCase.dto";
import { Document } from "../entities/Document.entity";
import { DocumentType } from "../entities/DocumentType.entity";
import { DocumentStatus } from "../enums/DocumentStatus.enum";
import { IDocumentRepository } from "../repositories/IDocumentRepository";
import { IDocumentTypeRepository } from "../repositories/IDocumentTypeRepository";
import { CreateDocumentUseCase } from "./CreateDocument.useCase";

describe('CreateDocumentUseCase', () => {
    let createDocumentUseCase: CreateDocumentUseCase;
    let documentRepository: jest.Mocked<IDocumentRepository>;
    let documentTypeRepository: jest.Mocked<IDocumentTypeRepository>;
    let employeeRepository: jest.Mocked<IEmployeeRepository>;

    const input: CreateDocumentUseCaseDto[] = [{
        name: "document-name-1",
        url: null,
        employeeId: "valid-employee-id",
        documentTypeId: "valid-document-type-id-2"
    }, {
        name: "document-name-1",
        url: "url",
        employeeId: "valid-employee-id",
        documentTypeId: "valid-document-type-id-2"
    }];

    beforeEach(() => {
        documentRepository = {
            create: jest.fn(),
        } as any;

        documentTypeRepository = {
            getById: jest.fn(),
        } as any;

        employeeRepository = {
            getById: jest.fn(),
        } as any;

        createDocumentUseCase = new CreateDocumentUseCase(
            documentRepository,
            documentTypeRepository,
            employeeRepository
        );
    });

    it('should be able to create one or more documents', async () => {
        const date = new Date();

        employeeRepository.getById
            .mockResolvedValueOnce({ id: "valid-employee-id" } as Employee)
            .mockResolvedValueOnce({ id: "valid-employee-id" } as Employee);

        documentTypeRepository.getById
            .mockResolvedValueOnce({ id: "valid-document-type-id-1" } as DocumentType)
            .mockResolvedValueOnce({ id: "valid-document-type-id-2" } as DocumentType);

        documentRepository.create
            .mockResolvedValueOnce({
                id: "document-id-1",
                name: input[0].name,
                status: input[0].url ? DocumentStatus.SENT : DocumentStatus.PENDING,
                employee: {
                    id: input[0].employeeId
                } as Employee,
                documentType: {
                    id: input[0].documentTypeId
                } as DocumentType,
                createdAt: date,
                updatedAt: date
            } as Document)
            .mockResolvedValueOnce({
                id: "document-id-2",
                name: input[1].name,
                status: input[1].url ? DocumentStatus.SENT : DocumentStatus.PENDING,
                employee: {
                    id: input[1].employeeId
                } as Employee,
                documentType: {
                    id: input[1].documentTypeId
                } as DocumentType,
                createdAt: date,
                updatedAt: date
            } as Document);

        await createDocumentUseCase.execute(input);

        expect(documentRepository.create).toHaveBeenNthCalledWith(1, {
            name: input[0].name,
            status: input[0].url ? DocumentStatus.SENT : DocumentStatus.PENDING,
            url: input[0].url,
            employeeId: input[0].employeeId,
            documentTypeId: input[0].documentTypeId
        });
        expect(documentRepository.create).toHaveBeenNthCalledWith(2, {
            name: input[1].name,
            status: input[1].url ? DocumentStatus.SENT : DocumentStatus.PENDING,
            url: input[1].url,
            employeeId: input[1].employeeId,
            documentTypeId: input[1].documentTypeId
        });
    });

    it('should throw an error if any employee is not found', async () => {
        const input: CreateDocumentUseCaseDto[] = [{
            name: "document-name",
            url: null,
            employeeId: "invalid-employee-id",
            documentTypeId: "valid-document-type-id"
        }];

        employeeRepository.getById.mockResolvedValue(null);
        documentTypeRepository.getById.mockResolvedValue({ id: "valid-document-type-id" } as DocumentType);

        await expect(createDocumentUseCase.execute(input)).rejects.toMatchObject(
            new ErrorHandler("Some of the data is wrong", 400, {
                errors: [{ index: 0, reason: "Employee invalid-employee-id not found" }]
            })
        );
    });

    it('should throw an error if any document type is not found', async () => {
        const input: CreateDocumentUseCaseDto[] = [{
            name: "document-name",
            url: null,
            employeeId: "valid-employee-id",
            documentTypeId: "invalid-document-type-id"
        }];

        employeeRepository.getById.mockResolvedValue({ id: "valid-employee-id" } as Employee);
        documentTypeRepository.getById.mockResolvedValue(null);

        await expect(createDocumentUseCase.execute(input)).rejects.toMatchObject(
            new ErrorHandler("Some of the data is wrong", 400, {
                errors: [{ index: 0, reason: "DocumentType invalid-document-type-id not found" }]
            })
        );
    });

    it('should throw an error with multiple validation issues', async () => {
        const input: CreateDocumentUseCaseDto[] = [{
            name: "document-name",
            url: null,
            employeeId: "invalid-employee-id",
            documentTypeId: "invalid-document-type-id"
        }];

        employeeRepository.getById.mockResolvedValue(null);
        documentTypeRepository.getById.mockResolvedValue(null);

        await expect(createDocumentUseCase.execute(input)).rejects.toMatchObject(
            new ErrorHandler("Some of the data is wrong", 400, {
                errors: [
                    { index: 0, reason: "Employee invalid-employee-id not found" },
                    { index: 0, reason: "DocumentType invalid-document-type-id not found" }
                ]
            })
        );
    });
});