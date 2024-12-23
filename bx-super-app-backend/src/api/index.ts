import { AccountController } from './account.controller';
import { HealthController } from './health.controller';
import { LegacyController } from './legacy.controller';
import { QueueController } from './queue.controller';
import { UserController } from './user.controller';
import { JobsController } from './jobs.controller';
import { PopupController } from './backoffice/popup.controller';
import { SettingsWhatsappController } from './backoffice/settings-whatsapp';
import { PymeControllerV2 } from './pymev2.controller';

export * from './account.controller';
export * from './user.controller';
export * from './health.controller';
export * from './legacy.controller';
export * from './queue.controller';
export * from './jobs.controller';
export * from './backoffice/popup.controller';
export * from './backoffice/settings-whatsapp';
export * from './pymev2.controller';

export const BackendMSControllers = [
  AccountController,
  HealthController,
  LegacyController,
  UserController,
  QueueController,
  JobsController,
  PopupController,
  SettingsWhatsappController,
  PymeControllerV2,
];
