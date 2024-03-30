import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AutomapperModule } from '@automapper/nestjs';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import typeorm from './libs/config/typeorm';


@Module({
  imports: [
    AutomapperModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.get('typeorm'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
