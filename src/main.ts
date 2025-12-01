import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Ajustando o Fuso Horario do BD
  process.env.TZ = '-03:00';

  // Aplicar
  app.useGlobalPipes(new ValidationPipe());

  // Habilitando o CORS do projeto
  app.enableCors();

  // Indico qual porta o projeto está sendo executado
  await app.listen(process.env.PORT ?? 4000);

}
bootstrap();
