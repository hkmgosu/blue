import { ShippingSchema } from './../schemas/shipping.schema';
import { Model } from 'mongoose';
import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Shipping, ShippingDocument } from '../schemas/shipping.schema';
import LoggerService from '../logger/logger.service';

@Injectable()
export class ShippingService {
  constructor(
    private readonly logger: LoggerService,
    @InjectModel(Shipping.name) private shippingModel: Model<ShippingDocument>,
  ) {}

  async getEvent(message: any): Promise<void> {
    try {
      await this.shippingModel.findOneAndUpdate(
        { orderId: message.orderId },
        {
          $set: {
            ...message,
            state: 'ERROR IN ORDER',
          },
        },
        { upsert: true, new: true },
      );

      this.logger.log('Send message', JSON.stringify(message));

      return;
    } catch (error) {
      this.logger.error(JSON.stringify(error.message), ShippingService.name);
    }
  }
}
