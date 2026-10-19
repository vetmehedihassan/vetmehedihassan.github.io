import { createOrderedListController } from '../../shared/controllers/ordered-list.controller';
import { achievementService } from '../services/achievement.service';
import { achievementSchema } from '../validations/achievement.validation';

export const achievementRoutes = createOrderedListController(achievementService, achievementSchema);
