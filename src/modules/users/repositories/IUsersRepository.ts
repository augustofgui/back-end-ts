import User from '@modules/users/entities/User';
import ICreateUserDTO from '@modules/users/dto/ICreateUserDTO';

export default interface IUsersRepository {
  findUserByEmail(email: string): Promise<User | null>;

  findUserById(id: string): Promise<User | null>;

  create({ name, email, password }: ICreateUserDTO): Promise<User>;

  updateAvatar(id: string, avatar: string): Promise<User>;
}
