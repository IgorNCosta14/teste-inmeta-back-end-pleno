import { Repository } from "typeorm";
import { IEmployeeRepository } from "./IEmployeeRepository";
import { AppDataSource } from "../../../config/typeOrm/dataSource";
import { Employee } from "../entities/Employee.entity";
import { CreateEmployeeDto } from "../dtos/CreateEmployee.dto";

export class EmployeeRepository implements IEmployeeRepository {
    private readonly employeeRepository: Repository<Employee>;

    constructor() {
        this.employeeRepository = AppDataSource.getRepository(Employee);
    }

    async create(data: CreateEmployeeDto): Promise<Employee> {
        const employee = this.employeeRepository.create(data);

        return await this.employeeRepository.save(employee);
    }

    async update(employee: Employee): Promise<Employee> {
        return await this.employeeRepository.save(employee);
    }

    async getById(id: string): Promise<Employee | null> {
        return await this.employeeRepository.findOne({
            where: {
                id
            }
        })
    }
}