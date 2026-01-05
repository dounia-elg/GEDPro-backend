import { Controller,Post,UploadedFile,UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MinioService } from '../minio/minio.service';
import type { Multer } from 'multer';
import { OcrService } from '../ocr/ocr.service';

@Controller('uploads')
export class UploadsController {
  constructor(
    private readonly minioService: MinioService,
    private readonly ocrService: OcrService,
) {}

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

    let extractedText: string | null = null;

    if (file.mimetype.startsWith('image/')) {
      extractedText = await this.ocrService.extractTextFromImage(
        file.buffer,
      );
    }

    return {
      message: 'File uploaded successfully',
      fileName,
      extractedText,
    };
  }
}
  