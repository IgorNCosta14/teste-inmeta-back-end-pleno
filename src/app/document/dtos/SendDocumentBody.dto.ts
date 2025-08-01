import { IsNotEmpty, IsString } from "class-validator";

export class SendDocumentBodyDto {
    @IsNotEmpty()
    @IsString()
    url: string;
}