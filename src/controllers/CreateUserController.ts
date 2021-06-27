import { Request, Response } from "express";
import { CreateUserService } from "../services/CreateUserService";

export class CreateUserController {
  async handle(request: Request, response: Response) {
    const { name, password, email } = request.body;

    const createUserService = new CreateUserService();

    const user = await createUserService.execute({ password, name, email });

    response.status(201).json(user);
  }
}
