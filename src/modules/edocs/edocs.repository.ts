import { EdocsEntity } from './edocs.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(EdocsEntity)
export class EdocsRepository extends Repository<EdocsEntity> {}
