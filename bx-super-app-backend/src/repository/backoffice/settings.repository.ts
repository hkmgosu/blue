import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  SettingsDoc,
  WhatsappType,
} from '../../commons/schemas/backoffice/settings.schema';
import { ISettingsRepository } from '../../commons/interfaces/repository/backoffice/ISettingsRepository.interface';
import { CreateSettingsDTO } from '../../models/dto/backoffice/create-settings.dto';
import { UpdateWhatsappRequest } from 'src/models/backoffice/update-whatsapp.model';

@Injectable()
export default class SettingsRepository implements ISettingsRepository {
  constructor(
    @InjectModel('Settings')
    private readonly settingsModel: Model<SettingsDoc>,
  ) {}

  async getWhatsappLink(): Promise<WhatsappType> {
    const settings = await this.settingsModel.find().exec();
    return settings[0].whatsapp_info;
  }

  async create(createSettingsDto: CreateSettingsDTO): Promise<SettingsDoc> {
    return this.settingsModel.create(createSettingsDto);
  }

  async updateWhatsappLink(
    request: UpdateWhatsappRequest,
  ): Promise<SettingsDoc> {
    const settings = await this.settingsModel.find().exec();
    return await this.settingsModel
      .findOneAndUpdate(
        { _id: settings[0]._id },
        { whatsapp_info: request },
        { new: true },
      )
      .exec();
  }
}
