import { encrypt } from "../common/auth/argon2";
import TeacherModel from "./teachers.model";
import { TeacherRegisterDto } from "./dto/register-teachers.dto";
import { badRequest } from "../common/utils/responses";

export async function create(teacher: TeacherRegisterDto) {
  const { username, password } = teacher;
  const encryptedPassword = await encrypt(password);
  const databaseTeacher = new TeacherModel({
    username,
    password: encryptedPassword,
  });
  try {
    await databaseTeacher.save();
  } catch (e) {
    throw badRequest("Username already exists");
  }
}

export async function findOne(username: string) {
  return TeacherModel.findOne({ username });
}
