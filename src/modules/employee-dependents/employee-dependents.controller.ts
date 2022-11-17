import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import { EmployeeDependentsService } from './employee-dependents.service';
import { CreateEmployeeDependentDto } from './dto/create-employee-dependent.dto';
import { UpdateEmployeeDependentDto } from './dto/update-employee-dependent.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Controller('employee-dependents')
export class EmployeeDependentsController {
  constructor(
    private readonly employeeDependentsService: EmployeeDependentsService,
  ) {}

  @Post()
  create(@Body() createEmployeeDependentDto: CreateEmployeeDependentDto) {
    return this.employeeDependentsService.create(createEmployeeDependentDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    // console.log(paginationDto);
    return this.employeeDependentsService.findAll(paginationDto);
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.employeeDependentsService.findOne(term);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateEmployeeDependentDto: UpdateEmployeeDependentDto,
  ) {
    return this.employeeDependentsService.update(
      id,
      updateEmployeeDependentDto,
    );
  }

 /*  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.employeeDependentsService.remove(id);
  } */
}
