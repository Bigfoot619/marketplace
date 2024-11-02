import { config } from 'dotenv';
import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpExceptionFilter } from './global-filters/http-exception.filter';
import { AllExceptionsFilter } from './global-filters/all-exceptions.filter';

config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    credentials: true,
  });

  //Pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  //swagger
  const config = new DocumentBuilder()
    .setTitle('API description')
    .setDescription('Functions descriptions')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  //class - transformer
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  
  //.env
  const configService = app.get<ConfigService>(ConfigService);
  const port = configService.get('APP_PORT');
  const globalPrefix = configService.get<string>('APP_PREFIX');

  const httpAdapterHost = app.get(HttpAdapterHost);
  
  app.useGlobalFilters(new HttpExceptionFilter(configService),
  new AllExceptionsFilter(httpAdapterHost));

  app.setGlobalPrefix(globalPrefix);
  await app.listen(port);
}
bootstrap();
