import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { EmployeeContactsService } from './employee-contacts.service';
import { CreateEmployeeContactDto } from './dto/create-employee-contact.dto';
import { UpdateEmployeeContactDto } from './dto/update-employee-contact.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Controller('employee-contacts')
export class EmployeeContactsController {
  constructor(
    private readonly employeeContactsService: EmployeeContactsService,
  ) {}

  @Post()
  create(@Body() createEmployeeContactDto: CreateEmployeeContactDto) {
    return this.employeeContactsService.create(createEmployeeContactDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    // console.log(paginationDto);
    return this.employeeContactsService.findAll(paginationDto);
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.employeeContactsService.findOne(term);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateEmployeeContactDto: UpdateEmployeeContactDto,
  ) {
    return this.employeeContactsService.update(id, updateEmployeeContactDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.employeeContactsService.remove(id);
  }
}
