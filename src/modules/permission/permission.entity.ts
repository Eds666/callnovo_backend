import { TimeInterval } from 'rxjs';
import {
  Column,
  DataSourceOptions,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'permission' })
export class PermissionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date', nullable: true })
  date_start: Date;

  @Column({ type: 'date', nullable: true })
  date_end: Date;

  @Column({ type: 'int', width: 11, nullable: true })
  type_license_id: number;

  @Column({ type: 'varchar', length: 200, nullable: true })
  details: string;

  @Column({ type: 'date', nullable: true })
  created_at: Date;

  @Column({ type: 'int', width: 11, nullable: true })
  CreateUserId: number;

  @Column({ type: 'date', nullable: true })
  updated_at: Date;

  @Column({ type: 'int', width: 11, nullable: true })
  UpdateUserId: number;

  @Column({ type: 'date', nullable: true })
  deleted_at: Date;

  @Column({ type: 'int', width: 11, nullable: true })
  DeleteUserId: number;

  @Column({ type: 'date', nullable: true })
  time_end: Date;

  @Column({ type: 'date', nullable: true })
  time_start;

  @Column({ type: 'int', width: 11, nullable: true })
  employee_id;
}
