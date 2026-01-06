import { IsEnum, IsNotEmpty } from 'class-validator';
import { DocumentCategory } from '../enums/document-category.enum';

export class UploadDocumentDto {
  @IsEnum(DocumentCategory)
  @IsNotEmpty()
  category: DocumentCategory;
}
