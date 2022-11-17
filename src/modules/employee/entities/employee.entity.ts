import { UserEntity } from '../../auth/entities/user.entity';
import { EmployeeContact } from '../../employee-contacts/entities/employee-contact.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EmployeeDependent } from '../../employee-dependents/entities/employee-dependent.entity';
import { Asset } from '../../assets/entities/asset.entity';

@Entity({ name: 'employee' })
export class EmployeeEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 60, nullable: true })
  name: string;

  @Column({ type: 'varchar', length: 60, nullable: true })
  surname: string;

  @Column({ type: 'varchar', length: 40, nullable: true })
  number_document: string;

  @Column({ type: 'date', nullable: true })
  birthdate: Date;

  @Column({ type: 'bigint', width: 20, nullable: true })
  phone_number: number;

  @Column({ type: 'varchar', length: 100, nullable: true })
  address: string;

  @Column({ type: 'varchar', length: 60, nullable: true })
  country: string;

  @Column({ type: 'varchar', length: 60, nullable: true })
  city: string;

  @Column({ type: 'varchar', length: 60, nullable: true })
  email: string;

  @Column({ type: 'varchar', length: 60, nullable: true })
  work_email: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  gender: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  profession: string;

  @Column({ type: 'boolean', nullable: true })
  enabled?: boolean;

  @Column({ type: 'varchar', length: 100, nullable: true })
  picture: string;

  @Column({ type: 'boolean', nullable: true })
  state?: boolean;

  @Column({ type: 'int', nullable: true })
  position_id: number;

  @Column({ type: 'int', nullable: true })
  organization_chart_id: number;

  @OneToOne(() => UserEntity, (user) => user.employee) // specify inverse side as a second parameter
  user: UserEntity;

  @OneToMany(
    () => EmployeeContact,
    (employeeContact) => employeeContact.employee,
    { cascade: true, eager: true },
  )
  contacts?: EmployeeContact[];

  @OneToMany(
    () => EmployeeDependent,
    (employeeDependent) => employeeDependent.employee,
    { cascade: true, eager: true },
  )
  dependents?: EmployeeDependent[];

  @OneToMany(() => Asset, (assets) => assets.employee, {
    cascade: true,
    eager: true,
  })
  assets?: Asset[];
}
