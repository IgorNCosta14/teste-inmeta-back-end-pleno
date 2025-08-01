import { Repository } from "typeorm";
import { IEmployeeRepository } from "./IEmployeeRepository";
import { AppDataSource } from "../../../config/typeOrm/dataSource";
import { Employee } from "../entities/Employee.entity";
import { CreateEmployeeDto } from "../dtos/CreateEmployee.dto";
import { ListEmployeesFiltersDto } from "../dtos/ListEmployeesFilters.dto";
import { ListEmployeesRespDto } from "../dtos/ListEmployeesResp.dto";

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

    async listEmployeesDocuments(id: string): Promise<Employee | null> {
        const employee = await this.employeeRepository
            .createQueryBuilder('employee')
            .leftJoinAndSelect('employee.documents', 'document', 'document.deletedAt IS NULL').withDeleted()
            .leftJoinAndSelect('document.documentType', 'documentType')
            .where('employee.id = :id', { id })
            .getOne();

        return employee;
    }

    async listEmployees({ page = 1, limit = 10, order = "ASC" }: ListEmployeesFiltersDto): Promise<ListEmployeesRespDto> {
        const [data, total] = await this.employeeRepository.findAndCount({
            skip: (page - 1) * limit,
            take: limit,
            order: {
                name: order,
            },
        });

        return {
            data,
            total,
            page,
            limit,
            order
        };
    }
}