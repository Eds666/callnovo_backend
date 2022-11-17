import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageDto } from 'src/common/message.dto';
import { Asset } from './entities/asset.entity';
import { AssetsRepository } from './assets.repoitory';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';
import { UserEntity } from '../auth/entities/user.entity';

@Injectable()
export class AssetsService {
  private readonly logger = new Logger('AssetsRepository');
  constructor(
    @InjectRepository(Asset)
    private assetsRepository: AssetsRepository,
  ) {}

  async getAll(): Promise<Asset[]> {
    const list = await this.assetsRepository.find();
    if (!list.length) {
      throw new NotFoundException(new MessageDto('esta tabla está vacía'));
    }
    return list;
  }

  async findById(id: number): Promise<Asset> {
    //const user = await this.employeeRepository.findOne(id);
    const assets = await this.assetsRepository.findOneBy({ id: id });
    if (!assets) {
      throw new NotFoundException(new MessageDto('no existe el activo'));
    }
    return assets;
  }

  async findByName(description: string): Promise<Asset> {
    //const employee = await this.userRepository.findOne({ name: name });
    const assets = await this.assetsRepository.findOneBy({
      description: description,
    });
    return assets;
  }

  async create(dto: CreateAssetDto, user: UserEntity): Promise<any> {
    const exists = await this.findByName(dto.serial_number);
    if (exists)
      throw new BadRequestException(new MessageDto('ese activo ya existe'));
    const assets = this.assetsRepository.create({ ...dto, user });
    await this.assetsRepository.save(assets);
    // return new MessageDto(`Activo ${assets.description} creado`);
    return assets;
  }

  async update(
    id: number,
    dto: CreateAssetDto,
    user: UserEntity,
  ): Promise<any> {
    const assets = await this.findById(id);
    if (!assets) throw new NotFoundException(new MessageDto('no existe'));
    const exists = await this.findByName(dto.description);
    if (exists && exists.id !== id)
      throw new BadRequestException(new MessageDto('ese Empleado ya existe'));
    dto.description
      ? (assets.description = dto.description)
      : (assets.description = assets.description);

    dto.description
      ? (assets.description = dto.description)
      : (assets.description = assets.description);

    dto.location
      ? (assets.location = dto.location)
      : (assets.location = assets.location);

    dto.subsidiary
      ? (assets.subsidiary = dto.subsidiary)
      : (assets.subsidiary = assets.subsidiary);

    dto.category
      ? (assets.category = dto.category)
      : (assets.category = assets.category);

    dto.brand ? (assets.brand = dto.brand) : (assets.brand = assets.brand);

    dto.model ? (assets.model = dto.model) : (assets.model = assets.model);

    dto.serial_number
      ? (assets.serial_number = dto.serial_number)
      : (assets.serial_number = assets.serial_number);

    dto.code ? (assets.code = dto.code) : (assets.code = assets.code);

    dto.purchase_date
      ? (assets.purchase_date = dto.purchase_date)
      : (assets.purchase_date = assets.purchase_date);

    dto.warranty_Date
      ? (assets.warranty_Date = dto.warranty_Date)
      : (assets.warranty_Date = assets.warranty_Date);

    dto.purchase_price
      ? (assets.purchase_price = dto.purchase_price)
      : (assets.purchase_price = assets.purchase_price);

    dto.condition_equipment
      ? (assets.condition_equipment = dto.condition_equipment)
      : (assets.condition_equipment = assets.condition_equipment);

    dto.antiquity
      ? (assets.antiquity = dto.antiquity)
      : (assets.antiquity = assets.antiquity);

    dto.current_value
      ? (assets.current_value = dto.current_value)
      : (assets.current_value = assets.current_value);

    dto.status_warranty
      ? (assets.status_warranty = dto.status_warranty)
      : (assets.status_warranty = assets.status_warranty);

    dto.status ? (assets.status = dto.status) : (assets.status = assets.status);

    dto.created_at
      ? (assets.created_at = dto.created_at)
      : (assets.created_at = assets.created_at);

    dto.createUserId
      ? (assets.createUserId = dto.createUserId)
      : (assets.createUserId = assets.createUserId);

    dto.updated_at
      ? (assets.updated_at = dto.updated_at)
      : (assets.updated_at = assets.updated_at);

    dto.updateUserId
      ? (assets.updateUserId = dto.updateUserId)
      : (assets.updateUserId = assets.updateUserId);

    dto.deleted_at
      ? (assets.deleted_at = dto.deleted_at)
      : (assets.deleted_at = assets.deleted_at);

    dto.deleteUserId
      ? (assets.deleteUserId = dto.deleteUserId)
      : (assets.deleteUserId = assets.deleteUserId);

    assets.user = user;
    await this.assetsRepository.save(assets);
    return new MessageDto(`Activo ${assets.description} actualizado`);
  }

  /* async delete(id: number): Promise<any> {
    const assets = await this.findById(id);
    await this.assetsRepository.delete(assets);
    return new MessageDto(`Activo ${assets.description} eliminado`);
  } */

  private handleDBExceptions(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);
    this.logger.error(error);
    // console.log(error);
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }

  async deleteAllAssets() {
    const query = this.assetsRepository.createQueryBuilder('assets');

    try {
      return await query.delete().where({}).execute();
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }
}
