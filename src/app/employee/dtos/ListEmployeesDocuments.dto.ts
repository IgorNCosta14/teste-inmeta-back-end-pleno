import { DocumentStatus } from "../../document/enums/DocumentStatus.enum";

export interface ListEmployeesDocumentsDto {
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
}