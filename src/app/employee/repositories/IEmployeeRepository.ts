import { CreateEmployeeDto } from "../dtos/CreateEmployee.dto";
import { Employee } from "../entities/Employee.entity"

export interface IEmployeeRepository {
    create(date: CreateEmployeeDto): Promise<Employee>;
    update(employee: Employee): Promise<Employee>;
    getById(id: string): Promise<Employee | null>;
}