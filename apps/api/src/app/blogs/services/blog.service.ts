import { ContentStatus } from '../../shared/constants/content-status';
import Blog, { IBlog } from '../models/blog.model';

class BlogService {
  listPublic() {
    return Blog.find({ status: ContentStatus.PRODUCTION, deletedAt: null }).sort({ publishedAt: -1 });
  }

  listAll() {
    return Blog.find({ deletedAt: null }).sort({ createdAt: -1 });
  }

  getBySlug(slug: string) {
    return Blog.findOne({ slug, status: ContentStatus.PRODUCTION, deletedAt: null });
  }

  create(data: Partial<IBlog>) {
    return Blog.create(data);
  }

  update(id: string, data: Partial<IBlog>) {
    return Blog.findOneAndUpdate({ _id: id, deletedAt: null }, data, { new: true });
  }

  softDelete(id: string) {
    return Blog.findOneAndUpdate({ _id: id, deletedAt: null }, { deletedAt: new Date() }, { new: true });
  }
}

export const blogService = new BlogService();
