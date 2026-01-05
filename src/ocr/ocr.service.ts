import { Injectable } from '@nestjs/common';
import * as Tesseract from 'tesseract.js';

@Injectable()
export class OcrService {
  async extractTextFromImage(buffer: Buffer): Promise<string> {
    const result = await Tesseract.recognize(
      buffer,
      'eng',
    );

    return result.data.text;
  }
}
