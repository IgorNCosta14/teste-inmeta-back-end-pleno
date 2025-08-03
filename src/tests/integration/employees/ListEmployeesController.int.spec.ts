import request from 'supertest';
import { app } from '../../../app';
import { AppDataSource } from '../../../config/typeOrm/dataSource';
import { Employee } from '../../../app/employee/entities/Employee.entity';

describe('ListEmployeesController', () => {
    beforeAll(async () => {
        jest.spyOn(console, 'log').mockImplementation(() => { });
        await AppDataSource.initialize();
    });

    beforeEach(async () => {
        await AppDataSource.query('TRUNCATE TABLE employees RESTART IDENTITY CASCADE');
    });

    afterAll(async () => {
        await AppDataSource.destroy();
    });

    it('should return a paginated list of employees', async () => {
        const repo = AppDataSource.getRepository(Employee);
        await repo.save(
            repo.create({
                name: 'employee-list-test',
                hiredAt: new Date('2024-08-01'),
            })
        );

        const response = await request(app)
            .get('/employees')
            .query({ page: 1, limit: 10, order: 'ASC' });

        expect(response.status).toBe(200);

        const { employees } = response.body.data;

        expect(Array.isArray(employees.data)).toBe(true);
        expect(employees.page).toBe(1);
        expect(employees.limit).toBe(10);
        expect(employees.order).toBe('ASC');
        expect(employees.total).toBeGreaterThanOrEqual(1);
    });

    it('should return 400 if query is invalid', async () => {
        const response = await request(app)
            .get('/employees')
            .query({ page: 0, limit: 500, order: 'WRONG' });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 400,
            message: 'Validation failed',
            errors: expect.any(Array),
        });

        expect(response.body.errors).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ field: 'page' }),
                expect.objectContaining({ field: 'limit' }),
                expect.objectContaining({ field: 'order' }),
            ])
        );
    });
});