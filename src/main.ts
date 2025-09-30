import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import { Logger } from '@nestjs/common';
import { httpsCertificate } from './https-certificate';

async function bootstrap() {
  const options = httpsCertificate();
  const app = await NestFactory.create(AppModule, {
    httpsOptions: options || undefined,
  });
  const logger = new Logger('Bootstrap');
  app.enableCors();
  app.setGlobalPrefix('api');
  app.use(bodyParser.json({ limit: '10mb' }));
  const port = process.env.PORT || 3000;
  logger.log(`Listening on port ${port}`);
  await app.listen(port);
}
bootstrap();
