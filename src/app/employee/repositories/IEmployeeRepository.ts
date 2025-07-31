import { CreateEmployeeDto } from "../dtos/CreateEmployee.dto";
import { ListEmployeesFiltersDto } from "../dtos/ListEmployeesFilters.dto";
import { ListEmployeesRespDto } from "../dtos/ListEmployeesResp.dto";
import { Employee } from "../entities/Employee.entity"

export interface IEmployeeRepository {
    create(date: CreateEmployeeDto): Promise<Employee>;
    update(employee: Employee): Promise<Employee>;
    getById(id: string): Promise<Employee | null>;
    listEmployees({ page, limit, order }: ListEmployeesFiltersDto): Promise<ListEmployeesRespDto>
}