import { DocumentStatus } from "../enums/DocumentStatus.enum";

export interface CreateDocumentUseCaseDto {
    name: string;
    url: string | null;
    employeeId: string;
    documentTypeId: string;
}