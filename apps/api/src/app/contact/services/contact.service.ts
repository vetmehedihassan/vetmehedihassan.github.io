import ContactSubmission, { ContactSubmissionStatus, IContactSubmission } from '../models/contact-submission.model';

class ContactService {
  create(data: Omit<IContactSubmission, 'status' | 'createdAt'>) {
    return ContactSubmission.create(data);
  }

  listAll() {
    return ContactSubmission.find().sort({ createdAt: -1 });
  }

  updateStatus(id: string, status: ContactSubmissionStatus) {
    return ContactSubmission.findByIdAndUpdate(id, { status }, { new: true });
  }
}

export const contactService = new ContactService();
