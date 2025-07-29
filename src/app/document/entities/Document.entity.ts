import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn
} from 'typeorm';
import { DocumentTypes } from './DocumentType.entity';
import { Employee } from '../../employee/entities/Employee.entity';

export type DocumentStatus = 'enviado' | 'pendente';

@Entity('documents')
export class Documents {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ type: 'enum', enum: ['enviado', 'pendente'], default: 'pendente' })
    status: DocumentStatus;

    @ManyToOne(() => Employee, (employee) => employee.documents, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'employee_id' })
    employee: Employee;

    @ManyToOne(() => DocumentTypes, (documentType) => documentType.documents, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'document_type_id' })
    DocumentTypes: DocumentTypes;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
