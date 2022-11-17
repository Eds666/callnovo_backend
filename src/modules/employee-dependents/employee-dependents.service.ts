import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isUUID } from 'class-validator';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Repository } from 'typeorm';
import { EmployeeContact } from '../employee-contacts/entities/employee-contact.entity';
import { CreateEmployeeDependentDto } from './dto/create-employee-dependent.dto';
import { UpdateEmployeeDependentDto } from './dto/update-employee-dependent.dto';
import { EmployeeDependent } from './entities/employee-dependent.entity';

@Injectable()
export class EmployeeDependentsService {
  private readonly logger = new Logger('EmployeeDependentsService');
  constructor(
    @InjectRepository(EmployeeDependent)
    private readonly employeeDependentRepository: Repository<EmployeeDependent>,
  ) {}

  async create(createEmployeeDependentDto: CreateEmployeeDependentDto) {
    try {
      const employeedependent = this.employeeDependentRepository.create(
        createEmployeeDependentDto,
      );
      await this.employeeDependentRepository.save(employeedependent);

      return employeedependent;
    } catch (error) {
      console.log(error);
      this.handleDBExceptions(error);
    }
  }

  findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
    return this.employeeDependentRepository.find({
      take: limit,
      skip: offset,
      // TODO: cuando hay relaciones
    });
  }

  async findOne(term: string) {
    let employeedependent: EmployeeContact;

    if (isUUID(term)) {
      employeedependent = await this.employeeDependentRepository.findOneBy({
        id: term,
      });
    } else {
      /* employeedependent = await this.employeeDependentRepository.findOneBy({
        name: term,
      }); */
      const queryBuilder =
        this.employeeDependentRepository.createQueryBuilder();
      employeedependent = await queryBuilder
        .where('name =:name or surname =:surname', {
          name: term,
          surname: term,
        })
        .getOne();
    }

    if (!employeedependent)
      throw new NotFoundException(`Employee dependet with ${term} not found`);

    return employeedependent;
  }

  async update(
    id: string,
    updateEmployeeDependentDto: UpdateEmployeeDependentDto,
  ) {
    const employeedependent = await this.employeeDependentRepository.preload({
      id: id,
      ...updateEmployeeDependentDto,
    });

    if (!employeedependent)
      throw new NotFoundException(`Employee dependet with Id: ${id} not found`);

    try {
      await this.employeeDependentRepository.save(employeedependent);
      return employeedependent;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

 /*  async remove(id: string) {
    const employeedependent = await this.findOne(id);

    await this.employeeDependentRepository.remove(employeedependent);
  } */

  private handleDBExceptions(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);
    this.logger.error(error);
    // console.log(error);
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}
