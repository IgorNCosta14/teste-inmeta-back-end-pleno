import { UpdateEmployeeDto } from "../dtos/UpdateEmployee.dto";
import { Employee } from "../entities/Employee.entity";
import { IEmployeeRepository } from "../repositories/IEmployeeRepository";
import { UpdateEmployeeUseCase } from "./UpdateEmployee.useCase";

describe('UpdateEmployeeUseCase', () => {
    let updateEmployeeUseCase: UpdateEmployeeUseCase;
    let employeeRepository: jest.Mocked<IEmployeeRepository>;

    beforeEach(() => {
        employeeRepository = {
            getById: jest.fn(),
            update: jest.fn()
        } as any;

        updateEmployeeUseCase = new UpdateEmployeeUseCase(employeeRepository);
    });

    it('should be able to update an employee', async () => {
        const date = new Date();

        const input: UpdateEmployeeDto = {
            id: "valid-uuid",
            name: "new-employee-name",
            hiredAt: date
        }

        const employee = {
            id: input.id,
            name: "employee-name",
            hiredAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
            createdAt: date,
        } as Employee;

        employeeRepository.getById.mockResolvedValue(employee);

        await updateEmployeeUseCase.execute(input);

        expect(employeeRepository.getById).toHaveBeenCalledWith(input.id);
        expect(employeeRepository.update).toHaveBeenCalledWith({
            id: input.id,
            name: input.name,
            hiredAt: input.hiredAt,
            createdAt: employee.createdAt,
        });
    });

    it('should throw an error if the employee does not exist', async () => {
        const date = new Date();

        const input: UpdateEmployeeDto = {
            id: "non-existent-id",
            name: "new-employee-name",
            hiredAt: date
        }

        employeeRepository.getById.mockResolvedValue(null);

        await expect(
            updateEmployeeUseCase.execute(input)
        ).rejects.toMatchObject({
            message: "Employee not found!",
            statusCode: 404
        });
    })
})