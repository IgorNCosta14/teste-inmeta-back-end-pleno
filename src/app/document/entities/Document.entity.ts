import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn,
    DeleteDateColumn
} from 'typeorm';
import { DocumentType } from './DocumentType.entity';
import { Employee } from '../../employee/entities/Employee.entity';
import { DocumentStatus } from '../enums/DocumentStatus.enum';

@Entity('documents')
export class Document {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ type: 'varchar', nullable: true })
    url: string | null;

    @Column({ type: 'enum', enum: DocumentStatus, default: DocumentStatus.PENDING })
    status: DocumentStatus;

    @ManyToOne(() => Employee, (employee) => employee.documents, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'employee_id' })
    employee: Employee;

    @ManyToOne(() => DocumentType, (documentType) => documentType.documents, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'document_type_id' })
    documentType: DocumentType;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @DeleteDateColumn({ name: 'deleted_at', nullable: true })
    deletedAt: Date | null;
}
