import request from 'supertest';
import { app } from '../../../app';
import { AppDataSource } from '../../../config/typeOrm/dataSource';

describe('CreateEmployeeController', () => {
    beforeAll(async () => {
        jest.spyOn(console, 'log').mockImplementation(() => { });
        await AppDataSource.initialize();
    });

    afterAll(async () => {
        await AppDataSource.destroy();
    });

    it('should be able to create a new employee', async () => {
        const response = await request(app)
            .post('/employees')
            .send({ name: 'employee-name', hiredAt: '2024-08-01' });

        expect(response.status).toBe(201);
        expect(response.body.data.employee).toHaveProperty('id');
        expect(response.body.data.employee.name).toBe('employee-name');
    });
});