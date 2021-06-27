import { Request, Response } from "express";
import { ListUserReceiveComplimentsService } from "../services/ListUserReceiveComplimentsService";

export class ListUserSendComplimentsController {
  async handle(request: Request, response: Response) {
    const { user_id } = request;

    const listUserSendComplimentsServices =
      new ListUserReceiveComplimentsService();

    const compliments = await listUserSendComplimentsServices.execute(user_id);

    return response.json(compliments);
  }
}
