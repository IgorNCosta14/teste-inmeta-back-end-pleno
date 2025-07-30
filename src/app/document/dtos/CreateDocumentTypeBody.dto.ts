import { IsNotEmpty, IsString } from "class-validator";

export class CreateDocumentTypeBodyDto {
    @IsNotEmpty()
    @IsString()
    name: string;
}