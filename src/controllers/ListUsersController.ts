import { Request, Response } from "express";
import { ListUserService } from "../services/ListUsersServices";

export class ListUsersController {
  async handle(request: Request, response: Response) {
    const listUsersServices = new ListUserService();

    const users = await listUsersServices.execute();

    return response.status(200).json(users);
  }
}
