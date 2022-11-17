import { CampaingEntity } from './campaing.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(CampaingEntity)
export class CampaingRepository extends Repository<CampaingEntity> {}
