import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  Res,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { diskStorage } from 'multer';
import { FilesService } from './files.service';

import { fileFilter, fileNamer } from './helpers';
import { ConfigService } from '@nestjs/config';

@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    private readonly configService: ConfigService,
  ) {}

  @Get('employee/:imageName')
  findEmployeeImage(
    @Res() res: Response, // este Response es de Express (la respuesta de express)
    @Param('imageName') imageName: string,
  ) {
    const path = this.filesService.getStaticEmployeeImage(imageName);
    /* res.status(403).json({
      ok: false,
      path: path,
    }); */
    res.sendFile(path);
  }

  @Post('employee')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: fileFilter,
      // limits: { fileSize: 1000 } // para decirle de que tamaño debe ser el file
      storage: diskStorage({
        destination: './static/employees',
        filename: fileNamer,
      }),
    }),
  )
  uploadEmployeeImage(@UploadedFile() file: Express.Multer.File) {
    // console.log({ FilesController: file });
    if (!file) {
      throw new BadRequestException(
        'Asegurate de que el archivo es una imagen',
      );
    }
    // console.log(file);
    // return file; // esto me muestra todos los datos del archivo
    // return { fileName: file.originalname }; // esto solo muestra el nombre

    // const secureUrl = `${file.filename}`;
    const secureUrl = `${this.configService.get('HOST_API')}/files/employees/${
      file.filename
    }`;

    return { secureUrl };
  }
}
