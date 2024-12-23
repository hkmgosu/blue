import { CreateSettingsDTO } from '../../src/models/dto/backoffice/create-settings.dto';

export const FAKE_WHATSAPP_LINK = 'http://fake-whatsapp.com';
export const FAKE_WHATSAPP_DATA_APP_ID = '123455-12346342-23423423';
export const FAKE_WHATSAPP_DATA_ID = 'fake-whatsapp';

export const fakeSettings: CreateSettingsDTO = {
  whatsapp_info: {
    url: FAKE_WHATSAPP_LINK,
    data_app_id: FAKE_WHATSAPP_DATA_APP_ID,
    data_id: FAKE_WHATSAPP_DATA_ID,
    id: FAKE_WHATSAPP_DATA_ID,
  },
};
