import { RoleDto } from './dto/role.Dto';
import { MessageDto } from 'src/common/message.dto';
import { RoleRepository } from './role.repository';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from './role.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity)
    private roleRepository: RoleRepository,
  ) {}

  async getAll(): Promise<RoleEntity[]> {
    const list = await this.roleRepository.find();
    if (!list.length) {
      throw new NotFoundException(new MessageDto('esta mierda está vacía'));
    }
    return list;
  }

  async findById(id: number): Promise<RoleEntity> {
    const role = await this.roleRepository.findOneBy({ id: id });
    if (!role) {
      throw new NotFoundException(new MessageDto('no existe el role'));
    }
    return role;
  }

  async findByName(name: string): Promise<RoleEntity> {
    const role = await this.roleRepository.findOneBy({ name: name });
    return role;
  }

  async create(dto: RoleDto): Promise<any> {
    const exists = await this.findByName(dto.name);
    if (exists)
      throw new BadRequestException(new MessageDto('ese role ya existe'));
    const role = this.roleRepository.create(dto);
    await this.roleRepository.save(role);
    return new MessageDto(`El role ${role.name} ha sido creado`);
  }

  async update(id: number, dto: RoleDto): Promise<any> {
    const role = await this.findById(id);
    if (!role) throw new NotFoundException(new MessageDto('no existe'));
    const exists = await this.findByName(dto.name);
    if (exists && exists.id !== id)
      throw new BadRequestException(new MessageDto('ese Role ya existe'));
    dto.name ? (role.name = dto.name) : (role.name = role.name);
    dto.ConcurrencyStamp
      ? (role.ConcurrencyStamp = dto.ConcurrencyStamp)
      : (role.ConcurrencyStamp = role.ConcurrencyStamp); //verificar si realmente se epuede editar
    await this.roleRepository.save(role);
    return new MessageDto(`Role ${role.name} actualizado`);
  }

  async delete(id: number): Promise<any> {
    const role = await this.findById(id);
    await this.roleRepository.delete(role);
    return new MessageDto(`Role ${role.name} eliminado`);
  }
}
