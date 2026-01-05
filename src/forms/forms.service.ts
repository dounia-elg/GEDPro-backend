import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Form } from './entities/form.entity';
import { CreateFormDto } from './dto/create-form.dto';
import { UpdateFormDto } from './dto/update-form.dto';

@Injectable()
export class FormsService {
  constructor(
    @InjectRepository(Form)
    private formRepository: Repository<Form>,
  ) {}

  async create(dto: CreateFormDto): Promise<Form> {
    const form = this.formRepository.create(dto);
    return this.formRepository.save(form);
  }

  findAll(): Promise<Form[]> {
    return this.formRepository.find({ relations: ['fields'] });
  }

  async findOne(id: string): Promise<Form> {
    const form = await this.formRepository.findOne({
      where: { id },
      relations: ['fields'],
    });

    if (!form) throw new NotFoundException('Form not found');
    return form;
  }

  async update(id: string, dto: UpdateFormDto): Promise<Form> {
    const form = await this.findOne(id);
    Object.assign(form, dto);
    return this.formRepository.save(form);
  }

  async remove(id: string): Promise<void> {
    const form = await this.findOne(id);
    await this.formRepository.remove(form);
  }
}
