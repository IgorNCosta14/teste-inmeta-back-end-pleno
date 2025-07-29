import { DataSource } from 'typeorm';
import { Employee } from '../../app/employee/entities/Employee.entity';
import { DocumentType } from '../../app/document/entities/DocumentType.entity';
import { Document } from '../../app/document/entities/Document.entity';

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [DocumentType, Employee, Document],
    migrations: ['src/config/typeOrm/migrations/*.ts'],
    // migrations: [__dirname + '/src/config/typeOrm/migrations/**'],
});