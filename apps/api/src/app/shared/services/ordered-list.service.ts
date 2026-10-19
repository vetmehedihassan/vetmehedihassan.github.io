import { Model } from 'mongoose';
import { ContentStatus } from '../constants/content-status';

export interface OrderedDoc {
  order: number;
  status: ContentStatus;
  deletedAt: Date | null;
}

/**
 * Shared CRUD behavior for the simple "ordered, status-filtered, soft-deleted"
 * content resources (Experience, Expertise, Education, Achievements). Each
 * module's own service just instantiates this with its Mongoose model —
 * avoids re-implementing the same list/create/update/soft-delete logic four
 * times for what is otherwise identical behavior.
 */
export class OrderedListService<T extends OrderedDoc> {
  constructor(private model: Model<T>) {}

  listPublic() {
    return this.model.find({ status: ContentStatus.PRODUCTION, deletedAt: null }).sort({ order: 1 });
  }

  listAll() {
    return this.model.find({ deletedAt: null }).sort({ order: 1 });
  }

  create(data: Partial<T>) {
    return this.model.create(data);
  }

  update(id: string, data: Partial<T>) {
    return this.model.findOneAndUpdate({ _id: id, deletedAt: null }, data, { new: true });
  }

  softDelete(id: string) {
    return this.model.findOneAndUpdate({ _id: id, deletedAt: null }, { deletedAt: new Date() }, { new: true });
  }
}
