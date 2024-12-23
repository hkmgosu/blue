import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PopupDoc } from '../../commons/schemas/backoffice/popup.schema';
import { CreatePopupDTO } from '../../models/dto/backoffice/create-popup.dto';
import { IPopupRepository } from '../../commons/interfaces/repository/backoffice/IPopupRepository.interface';

@Injectable()
export default class PopupRepository implements IPopupRepository {
  constructor(
    @InjectModel('Popup')
    private readonly PopupModel: Model<PopupDoc>,
  ) {}

  async get(): Promise<PopupDoc[]> {
    return this.PopupModel.find().exec();
  }
  async find(id: string): Promise<PopupDoc> {
    return this.PopupModel.findById(id).exec();
  }
  async findOne(): Promise<PopupDoc> {
    return this.PopupModel.findOne({ show: true }).exec();
  }
  async create(createPopupDTO: CreatePopupDTO): Promise<PopupDoc> {
    return this.PopupModel.create(createPopupDTO);
  }

  async update(popup_id: string, createPopupDTO: CreatePopupDTO) {
    const popup = await this.find(popup_id);
    if (!popup) {
      return this.create(createPopupDTO);
    } else {
      return this.PopupModel.findOneAndUpdate(
        { _id: popup_id },
        createPopupDTO,
        {
          new: true,
        },
      ).exec();
    }
  }
}
