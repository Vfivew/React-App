import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const client =
    'postgres://board_pe4j_user:cetdSqwHVVXk9nkJj9ohOziNq8NaGfO6@dpg-co4ktbi1hbls73bucvsg-a.oregon-postgres.render.com/board_pe4j';
  app.enableCors({
    origin: [client],
    methods: ['POST', 'PATCH', 'PUT', 'DELETE', 'GET'],
    credentials: true,
  });
  const config = new DocumentBuilder()
    .setTitle('API DOCUMENTATION')
    .setDescription('description')
    .setVersion('1.0')
    .addTag('Tasks')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
