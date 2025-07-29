import { container } from 'tsyringe';
import { IEmployeeRepository } from '../../app/employee/repositories/IEmployeeRepository';
import { EmployeeRepository } from '../../app/employee/repositories/Employee.repository';

container.registerSingleton<IEmployeeRepository>('EmployeeRepository', EmployeeRepository);