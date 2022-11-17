import { ClientEntity } from './client.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(ClientEntity)
export class ClientRepository extends Repository<ClientEntity> {}
