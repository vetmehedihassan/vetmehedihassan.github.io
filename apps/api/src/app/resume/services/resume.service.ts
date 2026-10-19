import Resume from '../models/resume.model';

class ResumeService {
  getResume() {
    return Resume.findOne();
  }

  upsertResume(driveUrl: string) {
    return Resume.findOneAndUpdate({}, { driveUrl }, { new: true, upsert: true, setDefaultsOnInsert: true });
  }
}

export const resumeService = new ResumeService();
