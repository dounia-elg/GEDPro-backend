import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormsService } from './forms.service';
import { FormsController } from './forms.controller';
import { Form } from './entities/form.entity';
import { FormField } from './entities/form-field.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Form, FormField])],
  controllers: [FormsController],
  providers: [FormsService],
})
export class FormsModule {}
