import { prismaClient } from '@shared/infra/database/prismaClient';

import User from '@modules/users/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dto/ICreateUserDTO';

class UsersRepository implements IUsersRepository {
  public async findUserByEmail(email: string): Promise<User | null> {
    const user = await prismaClient.user.findUnique({
      where: { email },
    });

    return user;
  }

  public async findUserById(id: string): Promise<User | null> {
    const user = await prismaClient.user.findUnique({
      where: { id },
    });

    return user;
  }

  public async create({ name, email, password }: ICreateUserDTO): Promise<User> {
    const user = await prismaClient.user.create({
      data: {
        name,
        email,
        password,
      },
    });

    return user;
  }

  public async updateAvatar(id: string, avatar: string): Promise<User> {
    const user = await prismaClient.user.update({
      where: {
        id,
      },
      data: {
        avatar,
      },
    });

    return user;
  }
}

export default UsersRepository;
