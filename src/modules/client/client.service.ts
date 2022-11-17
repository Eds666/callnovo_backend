import { ClientDto } from './dto/client.dto';
import { ClientRepository } from './client.repository';
import { ClientEntity } from './client.entity';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageDto } from 'src/common/message.dto';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(ClientEntity)
    private clientRepository: ClientRepository,
  ) {}

  async getAll(): Promise<ClientEntity[]> {
    const list = await this.clientRepository.find();
    if (!list.length) {
      throw new NotFoundException(
        new MessageDto('The list of clients are empty'),
      );
    }
    return list;
  }

  async findById(id: number): Promise<ClientEntity> {
    const client = await this.clientRepository.findOneBy({ id: id });
    if (!client) {
      throw new NotFoundException(new MessageDto('El cliente no exista'));
    }
    return client;
  }

  async findByName(name: string): Promise<ClientEntity> {
    const client = await this.clientRepository.findOneBy({
      name: name,
    });
    return client;
  }

  async create(dto: ClientDto): Promise<any> {
    const exists = await this.findByName(dto.name);
    if (exists)
      throw new BadRequestException(new MessageDto('ese cleinte ya existe'));
    const client = this.clientRepository.create(dto);
    await this.clientRepository.save(client);
    return new MessageDto(`Cliente ${client.name} creado`);
  }

  async update(id: number, dto: ClientDto): Promise<any> {
    const client = await this.findById(id);
    if (!client) throw new NotFoundException(new MessageDto('no existe'));
    const exists = await this.findByName(dto.name);
    if (exists && exists.id !== id)
      throw new BadRequestException(new MessageDto('ese cleinte ya existe'));
    dto.name ? (client.name = dto.name) : (client.name = client.name);
    dto.is_active
      ? (client.is_active = dto.is_active)
      : (client.is_active = client.is_active);
    await this.clientRepository.save(client);
    return new MessageDto(`Cliente ${client.name} actualizado`);
  }

  async delete(id: number): Promise<any> {
    const client = await this.findById(id);
    await this.clientRepository.delete(client);
    return new MessageDto(`Cliente ${client.name} eliminado`);
  }
}
