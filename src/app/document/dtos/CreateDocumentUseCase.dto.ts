export interface CreateDocumentUseCaseDto {
    name: string;
    url: string | null;
    employeeId: string;
    documentTypeId: string;
}