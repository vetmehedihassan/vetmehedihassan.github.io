import { OrderedListService } from '../../shared/services/ordered-list.service';
import Experience, { IExperienceDocument } from '../models/experience.model';

export const experienceService = new OrderedListService<IExperienceDocument>(Experience);
