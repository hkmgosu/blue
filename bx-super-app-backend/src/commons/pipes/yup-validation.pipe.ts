import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
// import { Schema } from 'yup';

@Injectable()
export class YupValidationPipe implements PipeTransform {
  constructor(private readonly schema) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async transform(value: any, metadata: ArgumentMetadata) {
    try {
      await this.schema.validate(value);
      return value;
    } catch (error) {
      throw new BadRequestException('Validation failed');
    }
  }
}
