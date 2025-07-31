import { DocumentStatus } from "../enums/DocumentStatus.enum";

export interface ListDocumentsFiltersDto {
    employeeId?: string;
    documentTypeId?: string;
    page?: number;
    limit?: number;
    status?: DocumentStatus,
    order?: "ASC" | "DESC"
}