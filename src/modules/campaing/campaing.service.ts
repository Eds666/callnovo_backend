import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageDto } from 'src/common/message.dto';
import { CampaingEntity } from './campaing.entity';
import { CampaingRepository } from './campaing.repository';
import { CampaingDto } from './dto/campaing.dto';

@Injectable()
export class CampaingService {
  constructor(
    @InjectRepository(CampaingEntity)
    private campaingRepository: CampaingRepository,
  ) {}

  async getAll(): Promise<CampaingEntity[]> {
    const list = await this.campaingRepository.find();
    if (!list.length) {
      throw new NotFoundException(new MessageDto('esta mierda está vacía'));
    }
    return list;
  }

  async findById(id: number): Promise<CampaingEntity> {
    //const user = await this.employeeRepository.findOne(id);
    const campaing = await this.campaingRepository.findOneBy({ id: id });
    if (!campaing) {
      throw new NotFoundException(new MessageDto('no existe el pelotudo'));
    }
    return campaing;
  }

  async findByName(name: string): Promise<CampaingEntity> {
    const campaing = await this.campaingRepository.findOneBy({
      name: name,
    });
    return campaing;
  }

  async create(dto: CampaingDto): Promise<any> {
    const exists = await this.findByName(dto.name);
    if (exists)
      throw new BadRequestException(new MessageDto('ese empleado ya existe'));
    const campaing = this.campaingRepository.create(dto);
    await this.campaingRepository.save(campaing);
    return new MessageDto(`Campaña ${campaing.name} creada`);
  }

  async update(id: number, dto: CampaingDto): Promise<any> {
    const campaing = await this.findById(id);
    if (!campaing) throw new NotFoundException(new MessageDto('no existe'));
    const exists = await this.findByName(dto.name);
    if (exists && exists.id !== id)
      throw new BadRequestException(new MessageDto('ese Empleado ya existe'));
    dto.name ? (campaing.name = dto.name) : (campaing.name = campaing.name);
    dto.address
      ? (campaing.address = dto.address)
      : (campaing.address = campaing.address);

    dto.email
      ? (campaing.email = dto.email)
      : (campaing.email = campaing.email);

    dto.phone_first
      ? (campaing.phone_first = dto.phone_first)
      : (campaing.phone_first = campaing.phone_first);

    dto.phone_second
      ? (campaing.phone_second = dto.phone_second)
      : (campaing.phone_second = campaing.phone_second);

    dto.is_active
      ? (campaing.is_active = dto.is_active)
      : (campaing.is_active = campaing.is_active);

    dto.start_date
      ? (campaing.start_date = dto.start_date)
      : (campaing.start_date = campaing.start_date);

    dto.end_date
      ? (campaing.end_date = dto.end_date)
      : (campaing.end_date = campaing.end_date);

    dto.country
      ? (campaing.country = dto.country)
      : (campaing.country = campaing.country);

    dto.city ? (campaing.city = dto.city) : (campaing.city = campaing.city);

    dto.status
      ? (campaing.status = dto.status)
      : (campaing.status = campaing.status);

    dto.rate ? (campaing.rate = dto.rate) : (campaing.rate = campaing.rate);

    dto.operation_hours
      ? (campaing.operation_hours = dto.operation_hours)
      : (campaing.operation_hours = campaing.operation_hours);

    dto.type_position
      ? (campaing.type_position = dto.type_position)
      : (campaing.type_position = campaing.type_position);

    dto.picture
      ? (campaing.picture = dto.picture)
      : (campaing.picture = campaing.picture);

    await this.campaingRepository.save(campaing);
    return new MessageDto(`Campaña ${campaing.name} actualizado`);
  }

  async delete(id: number): Promise<any> {
    const campaing = await this.findById(id);
    await this.campaingRepository.delete(campaing);
    return new MessageDto(`Campaña ${campaing.name} eliminada`);
  }
}
