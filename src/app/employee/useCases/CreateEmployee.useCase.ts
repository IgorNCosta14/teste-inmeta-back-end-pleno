import { inject, injectable } from "tsyringe";
import { Employee } from "../entities/Employee.entity";
import { IEmployeeRepository } from "../repositories/IEmployeeRepository";
import { CreateEmployeeDto } from "../dtos/CreateEmployee.dto";

@injectable()
export class CreateEmployeeUseCase {
    constructor(
        @inject('EmployeeRepository')
        private readonly employeeRepository: IEmployeeRepository
    ) { }

    async execute({
        name,
        hiredAt
    }: CreateEmployeeDto): Promise<Employee> {
        return await this.employeeRepository.create({
            name,
            hiredAt
        });
    }
}