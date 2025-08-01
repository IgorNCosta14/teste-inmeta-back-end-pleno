import { IsNotEmpty, IsUUID } from "class-validator";

export class SendDocumentParamsDto {
    @IsNotEmpty({ message: 'The "id" parameter is required in the route params' })
    @IsUUID('4', { message: 'The "id" parameter in the route params must be a valid UUID' })
    id: string;
}