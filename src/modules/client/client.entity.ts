import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'client' })
export class ClientEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, nullable: false, unique: true })
  name: string;

  @Column({ type: 'boolean', nullable: true })
  is_active: boolean;

  @Column({ type: 'varchar', length: 255, nullable: false })
  country: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  city: string;

  @Column({ type: 'varchar', length: 100, nullable: false})
  email: string;

  @Column({ type: 'varchar', length: 100, nullable: false})
  address: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
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
