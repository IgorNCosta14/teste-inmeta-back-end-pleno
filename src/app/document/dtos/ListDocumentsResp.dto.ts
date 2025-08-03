import { Document } from "../entities/Document.entity";

export interface ListDocumentsRespDto {
    data: Document[],
    total: number;
    page: number;
    limit: number;
    order: "ASC" | "DESC"
}