import Appointment, { AppointmentStatus, IAppointment } from '../models/appointment.model';

class AppointmentService {
  create(data: Omit<IAppointment, 'status' | 'createdAt'>) {
    return Appointment.create(data);
  }

  listAll() {
    return Appointment.find().sort({ createdAt: -1 });
  }

  updateStatus(id: string, status: AppointmentStatus) {
    return Appointment.findByIdAndUpdate(id, { status }, { new: true });
  }
}

export const appointmentService = new AppointmentService();
