import { IsNotEmpty, IsUUID } from "class-validator";

export class UpdateEmployeeParamsDto {
    @IsNotEmpty()
    @IsUUID()
    id: string;
}