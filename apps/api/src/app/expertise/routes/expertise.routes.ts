import { createOrderedListController } from '../../shared/controllers/ordered-list.controller';
import { expertiseService } from '../services/expertise.service';
import { expertiseSchema } from '../validations/expertise.validation';

export const expertiseRoutes = createOrderedListController(expertiseService, expertiseSchema);
