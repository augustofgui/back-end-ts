import "reflect-metadata";

import AppError from "@shared/errors/AppError";

import MockStorageProvider from "@shared/container/providers/StorageProviders/mocks/MockStoragesProvider";
import MockUsersRepository from "../repositories/MockUsersRepository";
import UpdateUserAvatarService from "./UpdateUserAvatarService";

describe("UpdateUserAvatar", () => {
  it("should be able to update avatar", async () => {
    const mockUsersRepository = new MockUsersRepository();
    const mockStorageProvider = new MockStorageProvider();

    const updateUserAvatar = new UpdateUserAvatarService(
      mockUsersRepository,
      mockStorageProvider
    );

    const user = await mockUsersRepository.create({
      name: "John Doe",
      email: "john@doe.com",
      password: "1122334455",
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: "avatar.jpg",
    });

    expect(user.avatar).toBe("avatar.jpg");
  });

  it("should not be able to update avatar to non existing user", async () => {
    const mockUsersRepository = new MockUsersRepository();
    const mockStorageProvider = new MockStorageProvider();

    const updateUserAvatar = new UpdateUserAvatarService(
      mockUsersRepository,
      mockStorageProvider
    );

    expect(
      updateUserAvatar.execute({
        user_id: "non user",
        avatarFilename: "avatar.jpg",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should update avatar by deleting old avatar", async () => {
    const mockUsersRepository = new MockUsersRepository();
    const mockStorageProvider = new MockStorageProvider();

    const deleteFile = jest.spyOn(mockStorageProvider, 'deleteFile');

    const updateUserAvatar = new UpdateUserAvatarService(
      mockUsersRepository,
      mockStorageProvider
    );

    const user = await mockUsersRepository.create({
      name: "John Doe",
      email: "john@doe.com",
      password: "1122334455",
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: "avatar.jpg",
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: "avatar2.jpg",
    })

    expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');
    expect(user.avatar).toBe("avatar2.jpg");
  });
});
