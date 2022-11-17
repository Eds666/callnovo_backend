import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

import { EmployeeEntity } from './entities/employee.entity';
import { validate as isUUID } from 'uuid';
import { EmployeeContact } from '../employee-contacts/entities/employee-contact.entity';
import { concat } from 'rxjs';

@Injectable()
export class EmployeeService {
  private readonly logger = new Logger('EmployeesService');
  constructor(
    @InjectRepository(EmployeeEntity)
    private readonly employeeRepository: Repository<EmployeeEntity>,
    @InjectRepository(EmployeeContact)
    private readonly employeeContactRepository: Repository<EmployeeContact>,

    private readonly dataSource: DataSource,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto) {
    try {
      const { contacts = [], ...employeeDetails } = createEmployeeDto;
      const employee = this.employeeRepository.create({
        ...employeeDetails,

        contacts: contacts.map((contact) =>
          this.employeeContactRepository.create({
            name: contact,
          }),
        ),
      });

      await this.employeeRepository.save(employee);

      return employee; // de esta manera muestro todos los campos de la tabla contactos
      // return { ...employee, contacts };
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  // este codigo memuestra el contenido completo de la tabla de contactos
  findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
    return this.employeeRepository.find({
      take: limit,
      skip: offset,
      relations: {
        contacts: true,
      },
    });

    /* async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;

    const employee = await this.employeeRepository.find({
      take: limit,
      skip: offset,
      relations: {
        contacts: true,
      },
    });
    return employee.map((employee) => ({
      ...employee,
      contacts: employee.contacts.map((contact) => contact.name),
    })); */
  }

  async findOne(term: string) {
    let employee: EmployeeEntity;

    if (isUUID(term)) {
      employee = await this.employeeRepository.findOneBy({
        id: term,
      });
    } else {
      /* employee = await this.employeeRepository.findOneBy({
        name: term,
      }); */
      const queryBuilder = this.employeeRepository.createQueryBuilder('emp');
      employee = await queryBuilder
        .where('emp.name =:name or emp.surname =:surname', {
          name: term,
          surname: term,
          /* .where('UPPER(name) =:name or surname =:surname', {
          name: term.toUpperCase(),
          surname: term.toLowerCase(), */
        })
        .leftJoinAndSelect('emp.contacts', 'empContacts')
        .getOne();
    }

    if (!employee)
      throw new NotFoundException(`Employee with ${term} not found`);

    return employee;
  }

  // metodo para aplanar el select solo hay que remplazar en el controller
  // en la parte de return this.employeeService.findOne(term);
  async findOnePlain(term: string) {
    const { contacts = [], ...employee } = await this.findOne(term);
    return {
      ...employee,
      contacts: contacts.map((contact) => contact.name),
    };
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    const { contacts, ...toUpdate } = updateEmployeeDto;
    const employee = await this.employeeRepository.preload({ id, ...toUpdate });

    if (!employee)
      throw new NotFoundException(`Employee with Id: ${id} not found`);
    // Creamos el Query runner
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      if (contacts) {
        await queryRunner.manager.delete(EmployeeContact, {
          employee: { id },
        }); // con esto borramos lo que estaba guardado

        employee.contacts = contacts.map((concat) =>
          this.employeeContactRepository.create({
            name: concat,
          }),
        );
      }

      await queryRunner.manager.save(employee);
      // await this.employeeRepository.save(employee);

      await queryRunner.commitTransaction(); //aplica los cambios
      await queryRunner.release(); // aqui hacemos que deje de funcionar el queryRunner

      // return employee;
      return this.findOne(id);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      this.handleDBExceptions(error);
    }
  }

  async remove(id: string) {
    const employee = await this.findOne(id);
    await this.employeeRepository.remove(employee);
  }

  private handleDBExceptions(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);
    this.logger.error(error);
    // console.log(error);
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }

  // Delete de todo lo que tengo en la tabla employee
  async deleteAllEmployees() {
    const query = this.employeeRepository.createQueryBuilder('employee');

    try {
      return await query.delete().where({}).execute();
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }
}
