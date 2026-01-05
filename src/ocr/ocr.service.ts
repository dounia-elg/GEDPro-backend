import { Injectable } from '@nestjs/common';
import * as Tesseract from 'tesseract.js';
import { SkillsService } from '../skills/skills.service';
import { CandidatesService } from '../candidates/candidates.service';

@Injectable()
export class OcrService {
  constructor(
    private readonly skillsService: SkillsService,
    private readonly candidatesService: CandidatesService,
  ) {}

  async extractTextFromImage(buffer: Buffer): Promise<string> {
    const result = await Tesseract.recognize(buffer, 'eng');

    return result.data.text;
  }

   async processCv(text: string, candidateId: string) {
    const skills = await this.skillsService.extractSkills(text);

    await this.candidatesService.attachSkills(candidateId, skills);

    return skills;
  }
}
