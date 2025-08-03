import { Type } from "class-transformer";
import { IsIn, IsInt, IsOptional, IsUUID, Max, Min } from "class-validator";
import { DocumentStatus } from "../enums/DocumentStatus.enum";

export class GetDocumentsQueryDto {
    @IsOptional()
    @IsUUID()
    employeeId?: string;

    @IsOptional()
    @IsUUID()
    documentTypeId?: string;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    page?: number;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @Max(100)
    limit?: number;

    @IsOptional()
    @IsIn(Object.values(DocumentStatus))
    status?: DocumentStatus;

    @IsOptional()
    @IsIn(["ASC", "DESC"], { message: "order must be either 'ASC' or 'DESC'" })
    order?: "ASC" | "DESC";
}