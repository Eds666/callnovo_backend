import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';

import { UserEntity } from './entities/user.entity';
import { CreateUserDto, LoginUserDto } from './dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const { password, ...userData } = createUserDto;
      const user = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync(password, 10),
      });

      await this.userRepository.save(user);
      delete user.password;

      return {
        ...user,
        token: this.getJwtToken({ id: user.id }),
      };
      // TODO: Retornar el JWT de acceso
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  // este codigo memuestra el contenido completo de la tabla de contactos
  findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
    return this.userRepository.find({
      take: limit,
      skip: offset,
      /* relations: {
        employee: true,
      }, */
    });
  }

  async login(loginUserDto: LoginUserDto) {
    const { password, email } = loginUserDto;

    const user = await this.userRepository.findOne({
      where: { email },
      select: { email: true, password: true, id: true },
    });

    if (!user)
      throw new UnauthorizedException('Credenciales no validas (email)');
    if (!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException('Credenciales no validas (password)');

    // console.log({ user });

    return {
      ...user,
      token: this.getJwtToken({ id: user.id }),
    };
    // TODO: regresar el JWT de acceso
  }

  async checkAuthStatus(user: UserEntity) {
    return {
      ...user,
      token: this.getJwtToken({ id: user.id }),
    };
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }

  // usamos never porque este metodo nunca devuelve un valor
  private handleDBErrors(error: any): never {
    if (error.code === '23505') throw new BadRequestException(error.detail);
    console.log(error);

    throw new InternalServerErrorException('por favor revise los server logs');
  }
}
