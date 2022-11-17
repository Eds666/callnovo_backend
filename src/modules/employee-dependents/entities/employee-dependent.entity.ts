import { EmployeeEntity } from 'src/modules/employee/entities/employee.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class EmployeeDependent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    nullable: true,
  })
  name: string;

  @Column('text', {
    nullable: true,
  })
  surname: string;

  @Column('bigint', {
    default: 0,
    nullable: true,
  })
  first_number: number;

  @Column('bigint', {
    default: 0,
    nullable: true,
  })
  second_number: number;

  @Column({
    type: 'text',
    nullable: true,
  })
  relationship: string;

  /* @Column({
    type: 'date',
    nullable: true,
  })
  birthdate: Date;

  @Column({
    type: 'date',
    nullable: true,
  })
  created_at: Date;

  @Column('int', {
    nullable: true,
  })
  CreateUserId: number;

  @Column({
    type: 'date',
    nullable: true,
  })
  updated_at: Date;

  @Column('int', {
    nullable: true,
  })
  UpdateUserId: number;

  @Column({
    type: 'date',
    nullable: true,
  })
  deleted_at: Date;

  @Column('int', {
    nullable: true,
  })
  DeleteUserId: number; */

  // este codigo es para insertar un registro concatenado
  /* @BeforeInsert()
  checkNameInsert() {
    if (!this.name) {
      this.name = this.surname;
    }
    this.name = this.name
      .toLowerCase()
      .replaceAll(' ', '_')
      .replaceAll("'", '');
  } */

  @ManyToOne(() => EmployeeEntity, (employee) => employee.dependents, {
    onDelete: 'CASCADE',
  })
  employee: EmployeeEntity;
}
