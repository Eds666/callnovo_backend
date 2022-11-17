import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'role' })
export class RoleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  name: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  ConcurrencyStamp: string;

  @PrimaryColumn()
  employee_id: number;
}
