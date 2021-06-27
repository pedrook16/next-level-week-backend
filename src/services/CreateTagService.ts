import { getCustomRepository } from "typeorm";
import { TagRepositories } from "../repositories/TagRepositories";

interface IRequestCreateTag {
  name: string;
}

export class CreateTagService {
  async execute({ name }: IRequestCreateTag) {
    const tagRepositories = getCustomRepository(TagRepositories);

    const tagAlreadyExists = await tagRepositories.findOne({ name });

    if (tagAlreadyExists) {
      throw new Error("Tag already exists!");
    }

    const tag = tagRepositories.create({
      name,
    });

    await tagRepositories.save(tag);

    return tag;
  }
}
