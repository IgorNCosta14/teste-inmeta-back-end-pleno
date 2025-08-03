import { ListEmployeesFiltersDto } from "../dtos/ListEmployeesFilters.dto";
import { IEmployeeRepository } from "../repositories/IEmployeeRepository";
import { ListEmployeesUseCase } from "./ListEmployees.useCase";

describe('ListEmployeesUseCase', () => {
    let listEmployeesUseCase: ListEmployeesUseCase;
    let employeeRepository: jest.Mocked<IEmployeeRepository>;


    beforeEach(() => {
        employeeRepository = {
            listEmployees: jest.fn()
        } as any;

        listEmployeesUseCase = new ListEmployeesUseCase(employeeRepository);
    });

    it('should be able to list all existing employees', async () => {
        const input: ListEmployeesFiltersDto = {
            page: 1,
            limit: 5,
            order: "ASC"
        };

        await listEmployeesUseCase.execute(input);

        expect(employeeRepository.listEmployees).toHaveBeenCalledWith(input);
    });
})