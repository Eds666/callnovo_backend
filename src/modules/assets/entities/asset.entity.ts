import { IsOptional } from 'class-validator';
import { EmployeeEntity } from '../../employee/entities/employee.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../../auth/entities/user.entity';

@Entity({ name: 'assets' })
export class Asset {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'varchar', nullable: true })
  description: string;

  @Column({ type: 'varchar', nullable: true })
  location: string;

  @Column({ type: 'varchar', nullable: true })
  subsidiary: string;

  @Column({ type: 'varchar', nullable: true })
  category: string;

  @Column({ type: 'varchar', nullable: true })
  brand: string;

  @Column({ type: 'varchar', nullable: true })
  model: string;

  @Column({ type: 'varchar', nullable: true })
  serial_number: string;

  @Column({ type: 'varchar', nullable: true })
  code: string;

  @Column({ type: 'date', nullable: true })
  purchase_date: Date;

  @Column({ type: 'date', nullable: true })
  warranty_Date: Date;

  @Column({ type: 'float', nullable: true })
  purchase_price: number;

  @Column({ type: 'varchar', nullable: true })
  condition_equipment: string;

  @Column({ type: 'float', nullable: true })
  antiquity: number;

  @Column({ type: 'float', nullable: true })
  current_value: number;

  @Column({ type: 'varchar', nullable: true })
  status_warranty: string;

  @Column({ type: 'boolean', nullable: true })
  status: boolean;

  @Column({ type: 'date', nullable: true })
  created_at: Date;

  @Column({ type: 'varchar', nullable: true })
  createUserId: string;

  @Column({ type: 'date', nullable: true })
  updated_at: Date;

  @Column({ type: 'varchar', nullable: true })
  updateUserId: string;

  @Column({ type: 'date', nullable: true })
  deleted_at: Date;

  @Column({ type: 'varchar', nullable: true })
  deleteUserId?: string;

  @ManyToOne(() => EmployeeEntity, (employee) => employee.assets, {
    onDelete: 'CASCADE',
  })
  employee: EmployeeEntity;

  @ManyToOne(() => UserEntity, (user) => user.assets, {
    eager: true,
  })
  user: UserEntity;
}
