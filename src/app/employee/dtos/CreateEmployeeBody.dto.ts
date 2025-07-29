import { IsNotEmpty, IsString, Matches } from "class-validator";

export class CreateEmployeeBodyDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @Matches(/^\d{4}-\d{2}-\d{2}$/, {
        message: 'hiredAt must be in format YYYY-MM-DD',
    })
    hiredAt: Date;
}