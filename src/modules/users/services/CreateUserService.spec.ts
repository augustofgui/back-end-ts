import "reflect-metadata";

import AppError from "@shared/errors/AppError";

import MockUsersRepository from "../repositories/MockUsersRepository";
import MockHashProvider from "../providers/HashProvider/mocks/MockHashProvider";
import CreateUserService from "./CreateUserService";

describe("CreateUsers", () => {
  it("should be able to create a new user", async () => {
    const mockUsersRepository = new MockUsersRepository();
    const mockHashProvider = new MockHashProvider();
    const createUser = new CreateUserService(mockUsersRepository, mockHashProvider);

    const user = await createUser.execute({
      name: 'John Doe',
      email: 'john@doe.com',
      password: '123456',
    });

    expect(user).toHaveProperty("id");
  });

  it("should not be able to create two users with the same email", async () => {
    const mockUsersRepository = new MockUsersRepository();
    const mockHashProvider = new MockHashProvider();
    const createUser = new CreateUserService(mockUsersRepository, mockHashProvider);

    await createUser.execute({
      name: 'John Doe',
      email: 'john@doe.com',
      password: '123456',
    });

    expect(
      createUser.execute({
        name: 'John Doe',
        email: 'john@doe.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
