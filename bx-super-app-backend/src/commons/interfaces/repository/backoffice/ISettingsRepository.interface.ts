import {
  SettingsDoc,
  WhatsappType,
} from '../../../schemas/backoffice/settings.schema';
import { CreateSettingsDTO } from '../../../../models/dto/backoffice/create-settings.dto';
import { UpdateWhatsappRequest } from 'src/models/backoffice/update-whatsapp.model';

export const SETTINGS_REPOSITORY = 'SETTINGS_REPOSITORY';

export interface ISettingsRepository {
  create(createSettingsDto: CreateSettingsDTO): Promise<SettingsDoc>;
  getWhatsappLink(): Promise<WhatsappType>;
  updateWhatsappLink(request: UpdateWhatsappRequest): Promise<SettingsDoc>;
}
