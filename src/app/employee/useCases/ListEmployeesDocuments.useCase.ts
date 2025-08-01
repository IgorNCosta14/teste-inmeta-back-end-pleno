import { inject, injectable } from "tsyringe";
import { IEmployeeRepository } from "../repositories/IEmployeeRepository";
import { ErrorHandler } from "../../../shared/errors/ErrorHandler";
import { DocumentStatus } from "../../document/enums/DocumentStatus.enum";

@injectable()
export class ListEmployeesDocumentsUseCase {
    constructor(
        @inject('EmployeeRepository')
        private readonly employeeRepository: IEmployeeRepository
    ) { }

    async execute(id: string): Promise<{
        id: string;
        name: string;
        hiredAt: Date;
        documents: {
            id: string;
            name: string;
            status: DocumentStatus;
            documentType: {
                id: string;
                name: string;
            }
        }[]
    }> {
        const employee = await this.employeeRepository.listEmployeesDocuments(id);

        if (!employee) {
            throw new ErrorHandler('Employee not found!', 404);
        }

        const resp = {
            id: employee.id,
            name: employee.name,
            hiredAt: employee.hiredAt,
            documents: employee.documents.map((document) => {
                return {
                    id: document.id,
                    name: document.name,
                    status: document.status,
                    documentType: {
                        id: document.documentType.id,
                        name: document.documentType.name
                    }
                }
            })
        }

        return resp;
    }
}