import { IsString } from 'class-validator';
import { EmployeeEntity } from '../../employee/entities/employee.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Asset } from '../../assets/entities/asset.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    unique: true,
  })
  email: string;

  @Column('text', {
    select: false,
  })
  password: string;

  @Column('text')
  username: string;

  @Column('bool', {
    default: true,
  })
  isActive: boolean;

  @Column('text', {
    // select: false,
    nullable: true,
  })
  img: string;

  @Column('text', {
    array: true,
    default: ['user'],
  })
  roles: string[];

  @OneToMany(() => Asset, (assets) => assets.user)
  assets: Asset;

  // @OneToOne(() => EmployeeEntity)
  // @JoinColumn()
  // employee: EmployeeEntity;
  @OneToOne(() => EmployeeEntity, (employee) => employee.user) // specify inverse side as a second parameter
  @JoinColumn()
  employee: EmployeeEntity;

  @BeforeInsert()
  checkFieldsBeforeInsert() {
    this.email = this.email.toLowerCase().trim();
  }

  @BeforeUpdate()
  checkFieldsBeforeUpdate() {
    this.checkFieldsBeforeInsert();
  }
}
