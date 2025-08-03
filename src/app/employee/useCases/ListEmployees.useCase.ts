import { inject, injectable } from "tsyringe";
import { IEmployeeRepository } from "../repositories/IEmployeeRepository";
import { ListEmployeesFiltersDto } from "../dtos/ListEmployeesFilters.dto";
import { ListEmployeesRespDto } from "../dtos/ListEmployeesResp.dto";

@injectable()
export class ListEmployeesUseCase {
    constructor(
        @inject('EmployeeRepository')
        private readonly employeeRepository: IEmployeeRepository
    ) { }

    async execute({ page, limit, order }: ListEmployeesFiltersDto): Promise<ListEmployeesRespDto> {
        return await this.employeeRepository.listEmployees({ page, limit, order });
    }
}