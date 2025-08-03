import { DataSource } from 'typeorm';
import { Employee } from '../../app/employee/entities/Employee.entity';
import { DocumentType } from '../../app/document/entities/DocumentType.entity';
import { Document } from '../../app/document/entities/Document.entity';

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'postgres',
    synchronize: true,
    logging: false,
    entities: [DocumentType, Employee, Document],
    migrations: ['src/config/typeOrm/migrations/*.ts'],
});