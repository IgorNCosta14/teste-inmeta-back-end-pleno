import request from 'supertest';
import { app } from '../../../app';
import { AppDataSource } from '../../../config/typeOrm/dataSource';
import { Employee } from '../../../app/employee/entities/Employee.entity';
import { DocumentType } from '../../../app/document/entities/DocumentType.entity';

describe('CreateDocumentController', () => {
    let employeeId: string;
    let documentTypeId: string;

    beforeAll(async () => {
        await AppDataSource.initialize();

        const employeeRepo = AppDataSource.getRepository(Employee);
        const docTypeRepo = AppDataSource.getRepository(DocumentType);

        const employee = employeeRepo.create({
            name: 'Test Employee',
            hiredAt: new Date('2024-08-01'),
        });
        const savedEmployee = await employeeRepo.save(employee);
        employeeId = savedEmployee.id;

        const docType = docTypeRepo.create({ name: 'RG' });
        const savedType = await docTypeRepo.save(docType);
        documentTypeId = savedType.id;
    });

    afterAll(async () => {
        await AppDataSource.query('TRUNCATE TABLE documents RESTART IDENTITY CASCADE');
        await AppDataSource.query('TRUNCATE TABLE document_types RESTART IDENTITY CASCADE');
        await AppDataSource.query('TRUNCATE TABLE employees RESTART IDENTITY CASCADE');
        await AppDataSource.destroy();
    });

    it('should create multiple documents successfully', async () => {
        const payload = {
            documents: [
                {
                    name: 'Doc 1',
                    url: null,
                    employeeId,
                    documentTypeId
                },
                {
                    name: 'Doc 2',
                    url: 'https://example.com/doc2.pdf',
                    employeeId,
                    documentTypeId
                }
            ]
        };

        const response = await request(app).post('/documents').send(payload);

        expect(response.status).toBe(201);
        expect(response.body.status).toBe(201);
        expect(response.body.message).toBe('Document created successfully');
        expect(response.body.data.documents.length).toBe(2);
    });

    it('should return 400 if some employee or document type is invalid', async () => {
        const invalidPayload = {
            documents: [
                {
                    name: 'Invalid',
                    url: null,
                    employeeId: '00000000-0000-0000-0000-000000000000',
                    documentTypeId: '11111111-1111-1111-1111-111111111111'
                }
            ]
        };

        const response = await request(app).post('/documents').send(invalidPayload);

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Some of the data is wrong');
        expect(response.body.errors).toHaveProperty('errors');
        expect(Array.isArray(response.body.errors.errors)).toBe(true);
        expect(response.body.errors.errors[0]).toHaveProperty('index');
        expect(response.body.errors.errors[0]).toHaveProperty('reason');
    });

    it('should return 400 if no documents are provided', async () => {
        const response = await request(app).post('/documents').send({ documents: [] });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Validation failed');
        expect(response.body.errors[0].field).toBe('documents');
    });
});