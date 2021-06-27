import { getCustomRepository } from "typeorm";
import { hash } from "bcryptjs";
import { UsersRepositories } from "../repositories/usersRepositories";

interface IRequestCreateUser {
  email: string;
  name: string;
  password: string;
}

export class CreateUserService {
  async execute({ email, name, password }: IRequestCreateUser) {
    const usersRepositories = getCustomRepository(UsersRepositories);

    const userAlreadyExists = await usersRepositories.findOne({
      email,
    });

    if (userAlreadyExists) {
      throw new Error("User already exists");
    }

    const passwordHash = await hash(password, 10);

    const user = usersRepositories.create({
      email,
      name,
      password: passwordHash,
    });

    await usersRepositories.save(user);

    return user;
  }
}
