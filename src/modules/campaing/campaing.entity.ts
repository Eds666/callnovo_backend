import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'campaing' })
export class CampaingEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'bigint', width: 20, nullable: true })
  client_id: number;

  @Column({ type: 'bigint', width: 20, nullable: true })
  employee_id: number;

  @Column({ type: 'varchar', length: 100, nullable: true })
  name: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  address: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  email: string;

  @Column({ type: 'bigint', nullable: true })
  phone_first: number;

  @Column({ type: 'bigint', nullable: true })
  phone_second: number;

  @Column({ type: 'boolean', nullable: true })
  is_active: boolean;

  @Column({ type: 'date', nullable: true })
  start_date: Date;

  @Column({ type: 'date', nullable: true })
  end_date: Date;

  @Column({ type: 'varchar', length: 60, nullable: true })
  country: string;

  @Column({ type: 'varchar', length: 60, nullable: true })
  city: string;

  @Column({ type: 'boolean', nullable: true })
  status: boolean;

  @Column({ type: 'float', nullable: true })
  rate: number;

  @Column({ type: 'float', nullable: true })
  operation_hours: number;

  @Column({ type: 'int', nullable: true })
  type_position: number;

  @Column({ type: 'varchar', length: 100, nullable: true })
  picture: string;

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
}
