import { Employee } from "../entities/Employee.entity";

export interface ListEmployeesRespDto {
    data: Employee[];
    total: number;
    page: number;
    limit: number;
    order: "ASC" | "DESC"
}