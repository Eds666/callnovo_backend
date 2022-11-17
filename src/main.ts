import { SERVER_PORT } from './config/constants';
import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const configService = app.get(ConfigService);
  const logger = new Logger('Bootstrap');

  //  prefijo para no mostrar las rutas
  app.setGlobalPrefix('api/v1');

  // Validacion global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Callnovo RESTFul API')
    .setDescription('Callnovo Endpoints')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // server port
  const port = +configService.get<number>(SERVER_PORT) || 3000;
  await app.listen(port);
  logger.log(`App corriendo en el puerto: ${port}`);

  //console.log(`listening on port ${await app.getUrl()}`);
}
bootstrap();
