import { ArrayNotEmpty, ArrayUnique, IsArray, IsUUID } from "class-validator";

export class DeleteDocumentBodyDto {
    @IsArray()
    @ArrayNotEmpty()
    @ArrayUnique({ message: 'ids must not contain duplicate values' })
    @IsUUID('4', { each: true })
    ids: string[];
}