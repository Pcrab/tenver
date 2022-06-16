import "dotenv/config";
import jwt, { JwtPayload } from "jsonwebtoken";
import { readFileSync } from "fs";
import path from "path";
import { badRequest } from "../utils/responses";
import { findOne as findOneTeacher } from "../../teachers/teachers.service";
import { findOne as findOneStudent } from "../../students/students.service";
import { Teacher } from "../../teachers/teachers.model";
import { Student } from "../../students/students.model";

const algorithm = "ES256";
const pwd = process.env.PWD as string;
const secretKey = readFileSync(path.join(pwd, "private.ec.key")).toString();
const publicKey = readFileSync(path.join(pwd, "public.pem")).toString();

export function sign(payload: any) {
  return jwt.sign(payload, secretKey, { algorithm, expiresIn: "1d" });
}

export async function verify(token: string): Promise<JwtPayload> {
  const verifyPromise = () => {
    return new Promise<JwtPayload>((resolve, reject) => {
      try {
        jwt.verify(token, publicKey, (err, decoded) => {
          resolve(decoded as JwtPayload);
        });
      } catch (e) {
        reject(e);
      }
    });
  };
  return verifyPromise();
}

export async function verifyToken(
  token: string | undefined,
  typeRequired: string
): Promise<Teacher | Student> {
  if (!token) {
    throw badRequest("Invalid token");
  }
  const { username, type } = await verify(token.slice(7));
  if (type !== typeRequired) {
    throw badRequest("This endpoint is not for you");
  }
  if (typeRequired === "TEACHER") {
    const teacher = await findOneTeacher(username);
    if (teacher) {
      return teacher;
    }
  } else if (typeRequired === "STUDENT") {
    const student = await findOneStudent(username);
    if (student) {
      return student;
    }
  }
  throw badRequest("User has been deleted");
}
