import { createOrderedListController } from '../../shared/controllers/ordered-list.controller';
import { experienceService } from '../services/experience.service';
import { experienceSchema } from '../validations/experience.validation';

export const experienceRoutes = createOrderedListController(experienceService, experienceSchema);
