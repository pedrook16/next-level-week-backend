import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/usersRepositories";
import auth from "../Configs/auth";
import { User } from "../entity/User";

interface IAuthenticateRequest {
  email: string;
  password: string;
}

export class AuthenticateUserServices {
  async execute({
    email,
    password,
  }: IAuthenticateRequest): Promise<{ token: string; user: User }> {
    const usersRepositories = getCustomRepository(UsersRepositories);

    const user = await usersRepositories.findOne({ email });

    if (!user) {
      throw new Error("Email/Password incorrent");
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("Email/Password incorrent");
    }

    const token = sign(
      {
        email: user.email,
      },
      auth.secret,
      {
        subject: user.id,
        expiresIn: auth.expiresIn,
      }
    );

    delete user.password;

    return { token, user };
  }
}
