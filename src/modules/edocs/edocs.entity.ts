import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'edcos' })
export class EdocsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 10, nullable: false, unique: true })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  content: string;

  @Column({ type: 'boolean', nullable: false })
  is_active: boolean;

  @Column({ type: 'date', nullable: true })
  created_at: Date;

  @Column({ type: 'int', width: 20, nullable: true })
  createUserId: number;

  @Column({ type: 'date', nullable: true })
  updated_at: Date;

  @Column({ type: 'int', width: 20, nullable: true })
  updateUserId: number;

  @Column({ type: 'date', nullable: true })
  deleted_at: Date;

  @Column({ type: 'int', width: 20, nullable: true })
  deleteUserId: number;

}
