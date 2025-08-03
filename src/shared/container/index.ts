import { container } from 'tsyringe';
import { IEmployeeRepository } from '../../app/employee/repositories/IEmployeeRepository';
import { EmployeeRepository } from '../../app/employee/repositories/Employee.repository';
import { DocumentTypeRepository } from '../../app/document/repositories/DocumentType.repository';
import { IDocumentTypeRepository } from '../../app/document/repositories/IDocumentTypeRepository';
import { DocumentRepository } from '../../app/document/repositories/Document.repository';
import { IDocumentRepository } from '../../app/document/repositories/IDocumentRepository';

container.registerSingleton<IEmployeeRepository>('EmployeeRepository', EmployeeRepository);
container.registerSingleton<IDocumentTypeRepository>('DocumentTypeRepository', DocumentTypeRepository);
container.registerSingleton<IDocumentRepository>('DocumentRepository', DocumentRepository);

