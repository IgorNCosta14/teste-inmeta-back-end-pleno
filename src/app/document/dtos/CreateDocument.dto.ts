import { DocumentStatus } from "../enums/DocumentStatus.enum";

export interface CreateDocumentDto {
    name: string;
    status: DocumentStatus;
    employeeId: string;
    documentTypeId: string;
    url: string | null;
}