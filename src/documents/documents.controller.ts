import {
  Controller,
  Post,
  Get,
  Param,
  Query,
  Body,
  UploadedFile,
  UseInterceptors,
  ParseIntPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DocumentsService } from './documents.service';
import { UploadDocumentDto } from './dto/upload-document.dto';
import { DocumentCategory } from './enums/document-category.enum';

@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Post('upload/:candidateId')
  @UseInterceptors(FileInterceptor('file'))
  uploadDocument(
    @Param('candidateId', ParseIntPipe) candidateId: number,
    @UploadedFile() file: Express.Multer.File,
    @Body() uploadDto: UploadDocumentDto,
  ) {
    return this.documentsService.uploadDocument(
      candidateId,
      file.originalname,
      file.path,
      uploadDto.category,
    );
  }

  @Get()
  findAll() {
    return this.documentsService.findAll();
  }

  @Get('search')
  search(
    @Query('candidateId') candidateId?: number,
    @Query('category') category?: DocumentCategory,
  ) {
    if (candidateId && category) {
      return this.documentsService.findByCandidateAndCategory(
        Number(candidateId),
        category,
      );
    }

    if (candidateId) {
      return this.documentsService.findByCandidate(Number(candidateId));
    }

    if (category) {
      return this.documentsService.findByCategory(category);
    }

    return this.documentsService.findAll();
  }
}
