import { Module } from '@nestjs/common';
import { UploadsController } from './uploads.controller';
import { MinioModule } from '../minio/minio.module';

@Module({
  imports: [MinioModule],
  controllers: [UploadsController],
})
export class UploadsModule {}
