import { createOrderedListController } from '../../shared/controllers/ordered-list.controller';
import { educationService } from '../services/education.service';
import { educationSchema } from '../validations/education.validation';

export const educationRoutes = createOrderedListController(educationService, educationSchema);
