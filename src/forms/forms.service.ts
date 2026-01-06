import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Form } from './entities/form.entity';
import { CreateFormDto } from './dto/create-form.dto';
import { UpdateFormDto } from './dto/update-form.dto';
import { FormResponse } from './entities/form-response.entity';
import { CreateFormResponseDto } from './dto/create-form-response.dto';

@Injectable()
export class FormsService {
    constructor(
        @InjectRepository(Form)
        private formRepository: Repository<Form>,

        @InjectRepository(FormResponse)
        private responseRepository: Repository<FormResponse>,
    ) { }

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

    async submitResponse(dto: CreateFormResponseDto) {
        const form = await this.formRepository.findOne({
            where: { id: dto.formId },
        });

        if (!form) {
            throw new NotFoundException('Form not found');
        }

        const response = this.responseRepository.create({
            form,
            answers: dto.answers,
            candidate: { id: dto.candidateId } as any,
        });

        return this.responseRepository.save(response);
    }

    async createDefaultTemplates() {
        const templates = [
            {
                title: 'Job Application Template',
                description: 'Standard job application form',
                isTemplate: true,
                fields: [
                    {
                        id: '1',
                        label: 'Full Name',
                        type: 'text',
                        required: true,
                        form: null,
                    },
                    {
                        id: '2',
                        label: 'Email',
                        type: 'email',
                        required: true,
                        form: null,
                    },
                    { id: '3', label: 'CV', type: 'file', required: true, form: null },
                ],
            },
            {
                title: 'Onboarding Template',
                description: 'Employee onboarding form',
                isTemplate: true,
                fields: [
                    {
                        id: '4',
                        label: 'Start Date',
                        type: 'date',
                        required: true,
                        form: null,
                    },
                    {
                        id: '5',
                        label: 'Position',
                        type: 'text',
                        required: true,
                        form: null,
                    },
                ],
            },
        ];

        for (const template of templates) {
            const exists = await this.formRepository.findOne({
                where: { title: template.title, isTemplate: true },
            });

            if (!exists) {
                const form = this.formRepository.create(template);
                await this.formRepository.save(form);
            }
        }
    }

    getTemplates() {
        return this.formRepository.find({
            where: { isTemplate: true },
            relations: ['fields'],
        });
    }

    async cloneTemplate(templateId: string) {
        const template = await this.formRepository.findOne({
            where: { id: templateId, isTemplate: true },
            relations: ['fields'],
        });

        if (!template) {
            throw new NotFoundException('Template not found');
        }

        const newForm = this.formRepository.create({
            title: template.title + ' (Copy)',
            description: template.description,
            isTemplate: false,
            fields: template.fields.map((field) => ({
                label: field.label,
                type: field.type,
                required: field.required,
            })),
        });

        return this.formRepository.save(newForm);
    }
}
