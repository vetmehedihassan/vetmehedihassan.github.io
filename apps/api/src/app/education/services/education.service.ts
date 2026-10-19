import { OrderedListService } from '../../shared/services/ordered-list.service';
import Education, { IEducationDocument } from '../models/education.model';

export const educationService = new OrderedListService<IEducationDocument>(Education);
