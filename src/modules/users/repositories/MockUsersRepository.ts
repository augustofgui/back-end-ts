import { prismaClient } from '@shared/infra/database/prismaClient';

import User from '@modules/users/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dto/ICreateUserDTO';

class MockUsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async findUserByEmail(email: string): Promise<User | null> {
    const findUser = this.users.find(user => user.email === email,);

    return findUser || null;
  }

  public async findUserById(id: string): Promise<User | null> {
    const findUser = this.users.find(user => user.id === id,);

    return findUser || null;
  }

  public async create({ name, email, password }: ICreateUserDTO): Promise<User> {
    const user = new User({ name, email, password});

    this.users.push(user);

    return user;
  }

  public async updateAvatar(id: string, avatar: string): Promise<User> {
    const userWithNewAvatar = this.users.find(user => user.id === id,);

    if(!userWithNewAvatar) {
      return this.users[0];
    }

    userWithNewAvatar.avatar = avatar;

    return userWithNewAvatar;
  }
}

export default MockUsersRepository;
