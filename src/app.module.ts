import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config' ; 
import { MongodbModule } from './database/mongodb/mongodb.module';
import { PostgresqlModule } from './database/postgresql/postgresql.module';
import { mongoConfig, postgresConfig } from './config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [mongoConfig, postgresConfig],
      envFilePath: '.env',
    }),
    MongodbModule,
    PostgresqlModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
