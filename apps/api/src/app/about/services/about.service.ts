import About, { IAbout } from '../models/about.model';

class AboutService {
  getAbout() {
    return About.findOne();
  }

  upsertAbout(data: Omit<IAbout, 'updatedAt'>) {
    return About.findOneAndUpdate({}, data, { new: true, upsert: true, setDefaultsOnInsert: true });
  }
}

export const aboutService = new AboutService();
