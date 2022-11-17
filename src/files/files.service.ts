import { existsSync } from 'fs';
import { join } from 'path';

import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class FilesService {
  getStaticEmployeeImage(imageName: string) {
    const path = join(__dirname, '../../static/employees', imageName);
    if (!existsSync(path))
      throw new BadRequestException(
        `No se encontró un empleado con la imagen ${imageName}`,
      );

    return path;
  }
}
