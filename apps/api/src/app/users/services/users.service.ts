import User, { IUserDocument } from '../models/users.model';

class UsersService {
  findByEmail(email: string): Promise<IUserDocument | null> {
    return User.findOne({ email: email.toLowerCase() }).select('+password');
  }

  findById(id: string): Promise<IUserDocument | null> {
    return User.findById(id);
  }
}

export const usersService = new UsersService();
