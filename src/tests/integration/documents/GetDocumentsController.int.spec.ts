import request from 'supertest';
import { app } from '../../../app';
import { AppDataSource } from '../../../config/typeOrm/dataSource';
import { Employee } from '../../../app/employee/entities/Employee.entity';
import { DocumentType } from '../../../app/document/entities/DocumentType.entity';
import { Document } from '../../../app/document/entities/Document.entity';
import { DocumentStatus } from '../../../app/document/enums/DocumentStatus.enum';

describe('GetDocumentsController', () => {
    let employeeId: string;
    let documentTypeId: string;

    beforeAll(async () => {
        jest.spyOn(console, 'log').mockImplementation(() => { });

        await AppDataSource.initialize();

        const employeeRepo = AppDataSource.getRepository(Employee);
        const documentTypeRepo = AppDataSource.getRepository(DocumentType);
        const documentRepo = AppDataSource.getRepository(Document);

        const employee = employeeRepo.create({
            name: 'Test Employee',
            hiredAt: new Date('2024-08-01')
        });
        const savedEmployee = await employeeRepo.save(employee);
        employeeId = savedEmployee.id;

        const docType = documentTypeRepo.create({ name: 'RG' });
        const savedDocType = await documentTypeRepo.save(docType);
        documentTypeId = savedDocType.id;

        const document = documentRepo.create({
            name: 'RG Document',
            employee: savedEmployee,
            documentType: savedDocType,
            url: null,
            status: DocumentStatus.PENDING
        });
        await documentRepo.save(document);
    });

    afterAll(async () => {
        await AppDataSource.query('TRUNCATE TABLE documents RESTART IDENTITY CASCADE');
        await AppDataSource.query('TRUNCATE TABLE document_types RESTART IDENTITY CASCADE');
        await AppDataSource.query('TRUNCATE TABLE employees RESTART IDENTITY CASCADE');
        await AppDataSource.destroy();
    });

    it('should return paginated documents filtered by employee and type', async () => {
        const response = await request(app).get('/documents').query({
            employeeId,
            documentTypeId,
            status: DocumentStatus.PENDING,
            page: 1,
            limit: 10,
            order: 'ASC'
        });

        expect(response.status).toBe(200);
        expect(response.body.status).toBe(200);
        expect(response.body.data.documents).toHaveProperty('data');
        expect(Array.isArray(response.body.data.documents.data)).toBe(true);
        expect(response.body.data.documents.data.length).toBeGreaterThan(0);
        expect(response.body.data.documents.data[0].employee.id).toBe(employeeId);
    });

    it('should return 400 for invalid query params', async () => {
        const response = await request(app).get('/documents').query({
            order: 'WRONG'
        });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toBe('Validation failed');
        expect(Array.isArray(response.body.errors)).toBe(true);
    });
});
