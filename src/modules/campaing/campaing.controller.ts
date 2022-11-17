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
import { CampaingService } from './campaing.service';
import { CampaingDto } from './dto/campaing.dto';

@Controller('campaing')
export class CampaingController {
  constructor(private readonly campaingService: CampaingService) {}

  @Get()
  async getAll() {
    return await this.campaingService.getAll();
  }

  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return await this.campaingService.findById(id);
  }

  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Post()
  async create(@Body() dto: CampaingDto) {
    return await this.campaingService.create(dto);
  }

  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CampaingDto,
  ) {
    return await this.campaingService.update(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.campaingService.delete(id);
  }
}
