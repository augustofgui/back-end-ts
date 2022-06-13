
import { injectable, inject } from 'tsyringe';
import path from 'path';
import fs from 'fs';

import uploadConfig from '@config/upload';

import User from '@modules/users/entities/User';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IStorageProvider from '@shared/container/providers/StorageProviders/models/IStorageProvider';

interface Request {
  user_id: string;
  avatarFilename: string;
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject("UsersRepository") private usersRepository: IUsersRepository,

    @inject("StorageProvider") private storageProvider: IStorageProvider,
  ) {}

  public async execute({ user_id, avatarFilename}: Request) : Promise<User> {
    const user = await this.usersRepository.findUserById( user_id );

    if(!user){
      throw new AppError("Only authenticated users can change avatars.", 401);
    }

    if(user.avatar){
      await this.storageProvider.deleteFile(user.avatar);
    }

    const filename = await this.storageProvider.saveFile(avatarFilename);

    const updatedUser = await this.usersRepository.updateAvatar( user_id, filename );

    return updatedUser;
  }
}

export default UpdateUserAvatarService;