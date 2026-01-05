import { Controller,Post,UploadedFile,UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MinioService } from '../minio/minio.service';
import type { Multer } from 'multer';

@Controller('uploads')
export class UploadsController {
  constructor(private readonly minioService: MinioService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Multer.File) {
    const fileName = `${Date.now()}-${file.originalname}`;
    const bucket = process.env.MINIO_BUCKET || 'default-bucket';

    await this.minioService.uploadFile(
      bucket,
      fileName,
      file.buffer,
      file.mimetype,
    );

    return {
      message: 'File uploaded successfully',
      fileName,
    };
  }
}
