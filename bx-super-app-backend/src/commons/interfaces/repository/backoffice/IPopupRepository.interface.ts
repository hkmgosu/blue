import { PopupDoc } from '../../../schemas/backoffice/popup.schema';
import { CreatePopupDTO } from '../../../../models/dto/backoffice/create-popup.dto';

export const POPUP_REPOSITORY = 'POPUP_REPOSITORY';

export interface IPopupRepository {
  get(): Promise<PopupDoc[]>;
  find(id: string): Promise<PopupDoc>;
  findOne(): Promise<PopupDoc>;
  create(createPopupDTO: CreatePopupDTO): Promise<PopupDoc>;
  update(id: string, createPopupDTO: CreatePopupDTO): Promise<PopupDoc>;
}
