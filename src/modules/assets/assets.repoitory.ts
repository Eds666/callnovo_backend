import { Asset } from './entities/asset.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Asset)
export class AssetsRepository extends Repository<Asset> {}
