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
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Auth } from '../auth/decorators';
import { ValidRoles } from '../auth/interfaces';

@Controller('employee')
// @Auth() // aqui le estoy diciendo que para usar cualquiera de estas rutas tiene que estar autenticado
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  @Auth(ValidRoles.user)
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeeService.create(createEmployeeDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    // console.log(paginationDto);
    return this.employeeService.findAll(paginationDto);
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.employeeService.findOne(term);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    return this.employeeService.update(id, updateEmployeeDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.employeeService.remove(id);
  }
}
