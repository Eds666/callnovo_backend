import { Module } from '@nestjs/common';
import { EdocsService } from './edocs.service';
import { EdocsController } from './edocs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EdocsEntity } from './edocs.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EdocsEntity])],
  providers: [EdocsService],
  controllers: [EdocsController],
})
export class EdocsModule {}
