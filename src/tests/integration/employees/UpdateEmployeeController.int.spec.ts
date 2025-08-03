import request from 'supertest';
import { app } from '../../../app';
import { AppDataSource } from '../../../config/typeOrm/dataSource';
import { Employee } from '../../../app/employee/entities/Employee.entity';

describe('UpdateEmployeeController', () => {
    let employeeId!: string;

    beforeAll(async () => {
        jest.spyOn(console, 'log').mockImplementation(() => { });
        await AppDataSource.initialize();

        const employeeRepo = AppDataSource.getRepository(Employee);

        const employee = employeeRepo.create({
            name: 'original-name',
            hiredAt: new Date('2024-08-01'),
        });

        const saved = await employeeRepo.save(employee);
        employeeId = saved.id;
    });

    afterAll(async () => {
        await AppDataSource.query('TRUNCATE TABLE employees RESTART IDENTITY CASCADE');
        await AppDataSource.destroy();
    });

    it('should update the employee', async () => {
        const response = await request(app)
            .put(`/employees/${employeeId}`)
            .send({ name: 'updated-name', hiredAt: '2024-08-15' });

        expect(response.status).toBe(200);
        expect(response.body).toMatchObject({
            status: 200,
            message: 'Employee updated successfully',
            data: {
                employee: expect.objectContaining({
                    id: employeeId,
                    name: 'updated-name',
                    hiredAt: '2024-08-15',
                })
            }
        });
    });

    it('should return 400 for invalid UUID param', async () => {
        const response = await request(app)
            .put('/employees/invalid-uuid')
            .send({ name: 'any-name' });

        expect(response.status).toBe(400);
        expect(response.body).toMatchObject({
            status: 400,
            message: 'Validation failed'
        });
    });

    it('should return 400 for invalid hiredAt format', async () => {
        const response = await request(app)
            .put(`/employees/${employeeId}`)
            .send({ hiredAt: '01-08-2024' });
        console.log(response.body);
        expect(response.status).toBe(400);
        expect(response.body).toMatchObject({
            status: 400,
            message: 'Validation failed',
            errors: expect.arrayContaining([
                expect.objectContaining({
                    field: 'hiredAt'
                })
            ])
        });
    });
});
