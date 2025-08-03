import request from 'supertest';
import { app } from '../../../app';
import { AppDataSource } from '../../../config/typeOrm/dataSource';

describe('CreateDocumentTypeController', () => {
    beforeAll(async () => {
        jest.spyOn(console, 'log').mockImplementation(() => { });
        await AppDataSource.initialize();
    });

    afterAll(async () => {
        await AppDataSource.query('TRUNCATE TABLE document_types RESTART IDENTITY CASCADE');
        await AppDataSource.destroy();
    });

    it('should create a document type successfully', async () => {
        const response = await request(app).post('/document-types').send({
            name: 'Test Document Type'
        });

        expect(response.status).toBe(201);
        expect(response.body).toMatchObject({
            status: 201,
            message: 'Document type created successfully',
            data: {
                documentType: {
                    id: expect.any(String),
                    name: 'Test Document Type',
                    createdAt: expect.any(String),
                    updatedAt: expect.any(String),
                }
            }
        });
    });

    it('should not allow duplicate document type names', async () => {
        await request(app).post('/document-types').send({ name: 'DuplicateName' });

        const response = await request(app).post('/document-types').send({ name: 'DuplicateName' });

        expect(response.status).toBe(422);
        expect(response.body).toMatchObject({
            status: 422,
            message: 'Name is already in use'
        });
    });

    it('should return 400 if name is missing', async () => {
        const response = await request(app).post('/document-types').send({});

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Validation failed');
        expect(Array.isArray(response.body.errors)).toBe(true);
        expect(response.body.errors[0].field).toBe('name');
    });

    it('should return 400 if name is not a string', async () => {
        const response = await request(app).post('/document-types').send({
            name: 123
        });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Validation failed');
        expect(Array.isArray(response.body.errors)).toBe(true);
        expect(response.body.errors[0].field).toBe('name');
    });
});