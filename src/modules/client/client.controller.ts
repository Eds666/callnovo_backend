import { ClientService } from './client.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ClientDto } from './dto/client.dto';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get()
  async getAll() {
    return await this.clientService.getAll();
  }

  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return await this.clientService.findById(id);
  }

  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Post()
  async create(@Body() dto: ClientDto) {
    return await this.clientService.create(dto);
  }

  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: ClientDto) {
    return await this.clientService.update(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.clientService.delete(id);
  }
}
