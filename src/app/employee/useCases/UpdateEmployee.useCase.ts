import { inject, injectable } from "tsyringe";
import { Employee } from "../entities/Employee.entity";
import { IEmployeeRepository } from "../repositories/IEmployeeRepository";
import { CreateEmployeeDto } from "../dtos/CreateEmployee.dto";
import { ErrorHandler } from "../../../shared/errors/ErrorHandler";
import { UpdateEmployeeDto } from "../dtos/UpdateEmployee.dto";

@injectable()
export class UpdateEmployeeUseCase {
    constructor(
        @inject('EmployeeRepository')
        private readonly employeeRepository: IEmployeeRepository
    ) { }

    async execute({
        id,
        name,
        hiredAt
    }: UpdateEmployeeDto): Promise<Employee> {
        const employee = await this.employeeRepository.getById(id);

        if (!employee) {
            throw new ErrorHandler('Employee not found!', 404);
        }

        if (name) employee.name = name;
        if (hiredAt) employee.hiredAt = hiredAt;

        return await this.employeeRepository.update(employee);
    }
}