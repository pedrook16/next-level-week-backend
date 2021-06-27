import { Request, Response } from "express";
import { AuthenticateUserServices } from "../services/AuthenticateUserService";

export class AuthenticateUserController {
  async handle(request: Request, response: Response) {
    const { email, password } = request.body;

    const authenticateUserController = new AuthenticateUserServices();

    const userAndToken = await authenticateUserController.execute({
      email,
      password,
    });

    return response.status(200).json(userAndToken);
  }
}
