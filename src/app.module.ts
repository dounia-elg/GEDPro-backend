import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config' ; 
import { MongodbModule } from './database/mongodb/mongodb.module';

@Module({
  imports: [ConfigModule, MongodbModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
