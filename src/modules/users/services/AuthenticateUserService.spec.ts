import "reflect-metadata";

import AppError from "@shared/errors/AppError";

import MockUsersRepository from "../repositories/MockUsersRepository";
import MockHashProvider from "../providers/HashProvider/mocks/MockHashProvider";
import CreateUserService from "./CreateUserService";
import AuthenticateUserService from "./AuthenticateUserService";

describe("AuthenticateUser", () => {
  it("should be able to authenticate user", async () => {
    const mockUsersRepository = new MockUsersRepository();
    const mockHashProvider = new MockHashProvider();

    const createUser = new CreateUserService(
      mockUsersRepository,
      mockHashProvider
    );
    const authenticateUser = new AuthenticateUserService(
      mockUsersRepository,
      mockHashProvider
    );

    const user = await createUser.execute({
      name: "John Doe",
      email: "john@doe.com",
      password: "123456",
    });

    const response = await authenticateUser.execute({
      email: "john@doe.com",
      password: "123456",
    });

    expect(response).toHaveProperty("token");
    expect(response.user).toEqual(user);
  });

  it("should not be able to authenticate with non existing user", async () => {
    const mockUsersRepository = new MockUsersRepository();
    const mockHashProvider = new MockHashProvider();

    const authenticateUser = new AuthenticateUserService(
      mockUsersRepository,
      mockHashProvider
    );

    expect(
      authenticateUser.execute({
        email: "notjohn@doe.com",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to authenticate user with wrong password", async () => {
    const mockUsersRepository = new MockUsersRepository();
    const mockHashProvider = new MockHashProvider();

    const createUser = new CreateUserService(
      mockUsersRepository,
      mockHashProvider
    );

    const authenticateUser = new AuthenticateUserService(
      mockUsersRepository,
      mockHashProvider  
    );

    await createUser.execute({
      name: "John Doe",
      email: "john@doe.com",
      password: "123456",
    });

    expect(
      authenticateUser.execute({
        email: "john@doe.com",
        password: "1234567",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
