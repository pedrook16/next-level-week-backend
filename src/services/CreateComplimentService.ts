import { getCustomRepository } from "typeorm";
import { Compliment } from "../entity/Compliment";
import { User } from "../entity/User";
import { ComplimentRepositories } from "../repositories/ComplimentRepositories";
import { UsersRepositories } from "../repositories/usersRepositories";

interface IRequestCreateCompliment {
  tag_id: string;
  user_sender: string;
  user_receiver: string;
  message: string;
}

export class CreateComplimentService {
  async execute({
    message,
    tag_id,
    user_receiver,
    user_sender,
  }: IRequestCreateCompliment) {
    const complimentsRepositories = getCustomRepository(ComplimentRepositories);
    const usersRepositories = getCustomRepository(UsersRepositories);

    if (user_sender === user_receiver) {
      throw new Error("Incorrect User Receiver");
    }

    const userReceiverExists = await usersRepositories.findOne(user_receiver);

    if (!userReceiverExists) {
      throw new Error("User Receiver does not exists!");
    }

    const compliment = complimentsRepositories.create({
      tag_id,
      user_receiver,
      user_sender,
      message,
    });

    await complimentsRepositories.save(compliment);

    return compliment;
  }
}
