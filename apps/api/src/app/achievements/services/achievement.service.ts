import { OrderedListService } from '../../shared/services/ordered-list.service';
import Achievement, { IAchievementDocument } from '../models/achievement.model';

export const achievementService = new OrderedListService<IAchievementDocument>(Achievement);
