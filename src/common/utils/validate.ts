import { ClassConstructor, plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { badRequest } from "./responses";

export async function validateObject<T extends object>(
  Dto: ClassConstructor<T>,
  object: any
) {
  const dto = plainToInstance(Dto, object);
  const err = await validate(dto);
  if (err.length > 0) {
    console.log(err);
    throw badRequest("Validation error");
  } else {
    return dto;
  }
}
