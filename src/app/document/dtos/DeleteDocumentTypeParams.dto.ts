import { IsNotEmpty, IsUUID } from "class-validator";

export class DeleteDocumentTypeParamsDto {
    @IsNotEmpty()
    @IsUUID()
    id: string;
}