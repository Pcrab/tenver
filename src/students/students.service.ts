import StudentModel from "./students.model";
import { genRandomPwd } from "../common/utils/randomPwd";
import { encrypt } from "../common/auth/argon2";
import studentModel from "./students.model";
import { badRequest, notFound } from "../common/utils/responses";

export async function create(username: string, password?: string) {
  const realPassword = password || genRandomPwd(12);
  const encryptedPassword = await encrypt(realPassword);
  const databaseStudent = new studentModel({
    username,
    password: encryptedPassword,
  });
  try {
    await databaseStudent.save();
    return {
      username,
      password: realPassword,
    };
  } catch (e) {
    throw badRequest("Username already exists");
  }
}

export async function all(page?: number, limit?: number) {
  if ((page && page < 0) || (limit && limit < 1)) {
    throw badRequest("Invalid page or limit");
  }
  if (page && limit) {
    return studentModel
      .find()
      .skip((page - 1) * limit)
      .limit(limit);
  }
  return StudentModel.find();
}

export async function findOne(username: string) {
  return StudentModel.findOne({ username });
}

export async function update(options: {
  username: string;
  newUsername?: string;
  newPassword?: string;
  newScore?: number;
}) {
  const student = await findOne(options.username);
  if (!student) {
    throw notFound("Student not found");
  }
  if (options.newUsername) {
    student.username = options.newUsername;
  }
  if (options.newPassword) {
    student.password = await encrypt(options.newPassword);
  }
  if (options.newScore) {
    student.score = options.newScore;
  }
  await student.save();
}
