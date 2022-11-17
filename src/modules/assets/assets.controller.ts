import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UsePipes,
  ValidationPipe,
  Put,
} from '@nestjs/common';
import { Auth, GetUser } from '../auth/decorators';
import { UserEntity } from '../auth/entities/user.entity';
import { ValidRoles } from '../auth/interfaces';
import { AssetsService } from './assets.service';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';

@Controller('assets')
export class AssetsController {
  constructor(private readonly assetsService: AssetsService) {}

  @Get()
  async getAll() {
    return await this.assetsService.getAll();
  }

  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return await this.assetsService.findById(id);
  }

  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Post()
  @Auth()
  async create(@Body() dto: CreateAssetDto, @GetUser() user: UserEntity) {
    return await this.assetsService.create(dto, user);
  }

  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Put(':id')
  @Auth()
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreateAssetDto,
    @GetUser() user: UserEntity,
  ) {
    return await this.assetsService.update(id, dto, user);
  }

  /*  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.assetsService.delete(id);
  } */
}
