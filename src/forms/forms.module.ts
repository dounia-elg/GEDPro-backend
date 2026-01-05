import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormsService } from './forms.service';
import { FormsController } from './forms.controller';
import { Form } from './entities/form.entity';
import { FormField } from './entities/form-field.entity';
import { FormResponse } from './entities/form-response.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Form, FormField, FormResponse])],
  controllers: [FormsController],
  providers: [FormsService],
})
export class FormsModule {}
