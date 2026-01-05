import { Module } from '@nestjs/common';
import { UploadsController } from './uploads.controller';
import { MinioModule } from '../minio/minio.module';
import { OcrModule } from '../ocr/ocr.module';

@Module({
  imports: [MinioModule, OcrModule],
  controllers: [UploadsController],
})
export class UploadsModule {}
