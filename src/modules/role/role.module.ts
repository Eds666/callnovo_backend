import { RoleEntity } from './role.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';

@Module({
  imports: [TypeOrmModule.forFeature([RoleEntity])],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule {}
