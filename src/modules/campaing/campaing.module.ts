import { Module } from '@nestjs/common';
import { CampaingService } from './campaing.service';
import { CampaingController } from './campaing.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CampaingEntity } from './campaing.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CampaingEntity])],
  providers: [CampaingService],
  controllers: [CampaingController],
})
export class CampaingModule {}
