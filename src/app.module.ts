import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config' ; 
import { MongodbModule } from './database/mongodb/mongodb.module';
import { PostgresqlModule } from './database/postgresql/postgresql.module';
import { mongoConfig, postgresConfig } from './config/database.config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [mongoConfig, postgresConfig],
      envFilePath: '.env',
    }),
    MongodbModule,
    PostgresqlModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
