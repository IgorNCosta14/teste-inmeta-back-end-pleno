import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";

export class CreateDocumentBodyDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    url: string | null;

    @IsNotEmpty()
    @IsString()
    employeeId: string;

    @IsNotEmpty()
    @IsString()
    documentTypeId: string;
}

export class CreateMultipleDocumentsBodyDto {
    @IsArray()
    @ArrayMinSize(1, { message: 'At least one document must be provided.' })
    @ValidateNested({ each: true })
    @Type(() => CreateDocumentBodyDto)
    documents: CreateDocumentBodyDto[];
}