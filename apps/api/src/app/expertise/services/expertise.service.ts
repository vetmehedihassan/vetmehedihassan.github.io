import { OrderedListService } from '../../shared/services/ordered-list.service';
import Expertise, { IExpertiseDocument } from '../models/expertise.model';

export const expertiseService = new OrderedListService<IExpertiseDocument>(Expertise);
