import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEmployeeContactDto } from './dto/create-employee-contact.dto';
import { UpdateEmployeeContactDto } from './dto/update-employee-contact.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

import { EmployeeContact } from './entities/employee-contact.entity';
import { validate as isUUID } from 'uuid';

@Injectable()
export class EmployeeContactsService {
  private readonly logger = new Logger('EmployeeContactsService');
  constructor(
    @InjectRepository(EmployeeContact)
    private readonly employeeContactRepository: Repository<EmployeeContact>,
  ) {}

  async create(createEmployeeContactDto: CreateEmployeeContactDto) {
    try {
      // este codigo sirve para generar un registro concatenando
      // if (!createEmployeeContactDto.name) {
      //   createEmployeeContactDto.name = createEmployeeContactDto.surname
      //     .toLowerCase()
      //     .replaceAll(' ', '_');
      // } else {
      //   createEmployeeContactDto.name = createEmployeeContactDto.name
      //     .toLowerCase()
      //     .replaceAll(' ', '_');
      // }

      const employeecontact = this.employeeContactRepository.create(
        createEmployeeContactDto,
      );
      await this.employeeContactRepository.save(employeecontact);

      return employeecontact;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
    return this.employeeContactRepository.find({
      take: limit,
      skip: offset,
      // TODO: cuando hay relaciones
    });
  }

  async findOne(term: string) {
    let employeecontact: EmployeeContact;

    if (isUUID(term)) {
      employeecontact = await this.employeeContactRepository.findOneBy({
        id: term,
      });
    } else {
      /* employeecontact = await this.employeeContactRepository.findOneBy({
        name: term,
      }); */
      const queryBuilder = this.employeeContactRepository.createQueryBuilder();
      employeecontact = await queryBuilder
        .where('name =:name or surname =:surname', {
          name: term,
          surname: term,
        })
        .getOne();
    }

    if (!employeecontact)
      throw new NotFoundException(`Employee Contact with ${term} not found`);

    return employeecontact;
  }

  async update(id: string, updateEmployeeContactDto: UpdateEmployeeContactDto) {
    const employeecontact = await this.employeeContactRepository.preload({
      id: id,
      ...updateEmployeeContactDto,
    });

    if (!employeecontact)
      throw new NotFoundException(`Employee contact with Id: ${id} not found`);

    try {
      await this.employeeContactRepository.save(employeecontact);
      return employeecontact;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async remove(id: string) {
    const employeecontact = await this.findOne(id);

    await this.employeeContactRepository.remove(employeecontact);
  }

  private handleDBExceptions(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);
    this.logger.error(error);
    // console.log(error);
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}
