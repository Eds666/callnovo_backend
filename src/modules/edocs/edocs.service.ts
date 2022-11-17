import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageDto } from 'src/common/message.dto';
import { EdocsDto } from './dto/edocs.Dto';
import { EdocsEntity } from './edocs.entity';
import { EdocsRepository } from './edocs.repository';

@Injectable()
export class EdocsService {
  constructor(
    @InjectRepository(EdocsEntity)
    private edocsRepository: EdocsRepository,
  ) {}

  async getAll(): Promise<EdocsEntity[]> {
    const list = await this.edocsRepository.find();
    if (!list.length) {
      throw new NotFoundException(new MessageDto('esta mierda está vacía'));
    }
    return list;
  }

  async findById(id: number): Promise<EdocsEntity> {
    //const user = await this.employeeRepository.findOne(id);
    const edocs = await this.edocsRepository.findOneBy({ id: id });
    if (!edocs) {
      throw new NotFoundException(new MessageDto('no existe el pelotudo'));
    }

    return edocs;
  }

  async findByName(name: string): Promise<EdocsEntity> {
    //const employee = await this.userRepository.findOne({ name: name });
    const edocs = await this.edocsRepository.findOneBy({
      name: name,
    });
    return edocs;
  }

  async create(dto: EdocsDto): Promise<any> {
    const exists = await this.findByName(dto.name);
    if (exists)
      throw new BadRequestException(new MessageDto('ese Edoc ya existe'));
    const edocs = this.edocsRepository.create(dto);
    await this.edocsRepository.save(edocs);
    return new MessageDto(`Edoc ${edocs.name} creado`);
  }

  async update(id: number, dto: EdocsDto): Promise<any> {
    const edocs = await this.findById(id);
    if (!edocs) throw new NotFoundException(new MessageDto('no existe'));
    const exists = await this.findByName(dto.name);
    if (exists && exists.id !== id)
      throw new BadRequestException(new MessageDto('ese Edoc ya existe'));
    dto.name ? (edocs.name = dto.name) : (edocs.name = edocs.name);
    dto.content
      ? (edocs.content = dto.content)
      : (edocs.content = edocs.content);
    await this.edocsRepository.save(edocs);
    return new MessageDto(`Edoc ${edocs.name} actualizado`);
  }

  async delete(id: number): Promise<any> {
    const edocs = await this.findById(id);
    await this.edocsRepository.delete(edocs);
    return new MessageDto(`Edoc ${edocs.name} eliminado`);
  }
}
