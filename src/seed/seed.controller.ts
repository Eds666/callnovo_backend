import { Controller, Get } from '@nestjs/common';
import { ValidRoles } from '../modules/auth/interfaces';
import { Auth } from '../modules/auth/decorators';
import { SeedService } from './seed.service';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Get()
  // @Auth(ValidRoles.admin, ValidRoles.superUser)
  excuteSeed() {
    return this.seedService.runSeed();
  }
}
