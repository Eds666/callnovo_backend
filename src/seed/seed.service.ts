import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { AssetsService } from '../modules/assets/assets.service';
import { initialData } from './data/seed-data';
import { UserEntity } from 'src/modules/auth/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SeedService {
  constructor(
    private readonly assetsService: AssetsService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async runSeed() {
    await this.deleteTables();
    const firstUser = await this.insertUsers();

    await this.insertNewAssets(firstUser);
    return 'SEED EXECUTED';
  }

  private async deleteTables() {
    await this.assetsService.deleteAllAssets();

    const queryBuilder = this.userRepository.createQueryBuilder();
    await queryBuilder.delete().where({}).execute();
  }

  private async insertUsers() {
    const seedUsers = initialData.users;
    const users: UserEntity[] = [];

    seedUsers.forEach((user) => {
      users.push(this.userRepository.create(user));
    });

    const dbUsers = await this.userRepository.save(seedUsers);

    return dbUsers[0];
  }

  private async insertNewAssets(user: UserEntity) {
    await this.assetsService.deleteAllAssets();

    const assets = initialData.assets;
    const insertPromises = [];

    assets.forEach((assets) => {
      insertPromises.push(this.assetsService.create(assets, user));
    });

    await Promise.all(insertPromises);

    return true;
  }
}
