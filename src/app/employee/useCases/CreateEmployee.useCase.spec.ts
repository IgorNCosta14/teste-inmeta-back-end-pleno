import { CreateEmployeeUseCase } from './CreateEmployee.useCase';
import { IEmployeeRepository } from '../repositories/IEmployeeRepository';
import { CreateEmployeeDto } from '../dtos/CreateEmployee.dto';

describe('CreateEmployeeUseCase', () => {
    let createEmployeeUseCase: CreateEmployeeUseCase;
    let employeeRepository: jest.Mocked<IEmployeeRepository>;

    beforeEach(() => {
        employeeRepository = {
            create: jest.fn(),
            save: jest.fn(),
        } as any;

        createEmployeeUseCase = new CreateEmployeeUseCase(employeeRepository);
    });

    it('should be able to create a new employee', async () => {
        const input: CreateEmployeeDto = { name: 'Igor', hiredAt: new Date() };

        await createEmployeeUseCase.execute(input);

        expect(employeeRepository.create).toHaveBeenCalledWith(input);
    });
});