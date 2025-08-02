import { ErrorHandler } from "../../../shared/errors/ErrorHandler";
import { Document } from "../../document/entities/Document.entity";
import { DocumentType } from "../../document/entities/DocumentType.entity";
import { DocumentStatus } from "../../document/enums/DocumentStatus.enum";
import { Employee } from "../entities/Employee.entity";
import { IEmployeeRepository } from "../repositories/IEmployeeRepository";
import { ListEmployeesDocumentsUseCase } from "./ListEmployeesDocuments.useCase";

describe('ListEmployeesDocumentsUseCase', () => {
    let listEmployeesDocumentsUseCase: ListEmployeesDocumentsUseCase;
    let employeeRepository: jest.Mocked<IEmployeeRepository>;

    const input: string = "valid-uuid";
    const date = new Date();

    const document = {
        id: "valid-uuid",
        name: "document-name",
        status: DocumentStatus.PENDING,
        url: null,
        documentType: {
            id: "valid-uuid",
            name: "document-type-name",
            createdAt: date
        } as DocumentType,
        createdAt: date,
        updatedAt: date
    } as Document

    const employee = {
        id: input,
        name: "employee-name",
        hiredAt: date,
        documents: [
            document
        ],
        createdAt: date,
        updatedAt: date
    } as Employee;

    beforeEach(() => {
        employeeRepository = {
            listEmployeesDocuments: jest.fn()
        } as any;

        listEmployeesDocumentsUseCase = new ListEmployeesDocumentsUseCase(employeeRepository);
    });

    it('should be able to list all documents of an employee', async () => {
        const response = {
            id: input,
            name: employee.name,
            hiredAt: employee.hiredAt,
            documents: [
                {
                    id: document.id,
                    name: document.name,
                    status: document.status,
                    documentType: {
                        id: document.documentType.id,
                        name: document.documentType.name,
                    }
                }
            ]
        }

        employeeRepository.listEmployeesDocuments.mockResolvedValue(employee);

        const result = await listEmployeesDocumentsUseCase.execute(input);

        expect(employeeRepository.listEmployeesDocuments).toHaveBeenCalledWith(input);
        expect(result).toEqual(response);
    });

    it('should throw an error if the employee does not exist', async () => {
        employeeRepository.listEmployeesDocuments.mockResolvedValue(null);

        await expect(
            listEmployeesDocumentsUseCase.execute("non-existent-id")
        ).rejects.toMatchObject({
            message: "Employee not found!",
            statusCode: 404
        });
    })
})