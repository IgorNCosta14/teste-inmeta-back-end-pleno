import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn
} from 'typeorm';
import { DocumentType } from './DocumentType.entity';
import { Employee } from '../../employee/entities/Employee.entity';

export type DocumentStatus = 'enviado' | 'pendente';

@Entity('documents')
export class Document {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ type: 'enum', enum: ['enviado', 'pendente'], default: 'pendente' })
    status: DocumentStatus;

    @ManyToOne(() => Employee, (employee) => employee.documents, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'employee_id' })
    employee: Employee;

    @ManyToOne(() => DocumentType, (documentType) => documentType.documents, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'document_type_id' })
    DocumentTypes: DocumentType;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
