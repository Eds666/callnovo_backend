import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { EdocsDto } from './dto/edocs.Dto';
import { EdocsService } from './edocs.service';

@Controller('edocs')
export class EdocsController {
  constructor(private readonly edocsService: EdocsService) {}

  @Get()
  async getAll() {
    return await this.edocsService.getAll();
  }

  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return await this.edocsService.findById(id);
  }

  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Post()
  async create(@Body() dto: EdocsDto) {
    return await this.edocsService.create(dto);
  }

  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: EdocsDto) {
    return await this.edocsService.update(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.edocsService.delete(id);
  }
}
