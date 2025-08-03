import { IsOptional, IsString, Matches } from "class-validator";

export class UpdateEmployeeBodyDto {
    @IsOptional()
    @IsString()
    name: string;

    @IsOptional()
    @Matches(/^\d{4}-\d{2}-\d{2}$/, {
        message: 'hiredAt must be in format YYYY-MM-DD',
    })
    hiredAt: Date;
}