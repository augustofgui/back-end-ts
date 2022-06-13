import { Request, Response } from "express";
import { container } from "tsyringe";

import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import IUserDTO from "@modules/users/dto/IUserDTO";

class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const filename = request.file.filename;

    const updateUserAvatarService = container.resolve(UpdateUserAvatarService);

    const user = await updateUserAvatarService.execute({
      user_id: request.user.id,
      avatarFilename: filename,
    });

    const userResponse: IUserDTO = user;
    delete userResponse.password;

    return response.json(userResponse);
  }
}

export default UserAvatarController;
