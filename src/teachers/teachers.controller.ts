import express from "express";
import asyncHandler from "express-async-handler";
import { sign, verifyToken } from "../common/auth/jwt";
import { TeacherRegisterDto } from "./dto/register-teachers.dto";
import { validateObject } from "../common/utils/validate";
import { create, findOne } from "./teachers.service";
import { TeacherLoginDto } from "./dto/login-teachers.dto";
import { CreateStudentDto } from "../students/dto/create-students.dto";
import { unauthorized } from "../common/utils/responses";
import {
  all as allStudents,
  create as createStudent,
  update as updateStudent,
} from "../students/students.service";
import { AllStudentsDto } from "../students/dto/all-students.dto";
import { Teacher } from "./teachers.model";
import { UpdateStudentDto } from "../students/dto/update-students.dto";
import { verify } from "../common/auth/argon2";
import logger from "../common/logger";

const router = express.Router();

async function verifyTeacherToken(token: string | undefined) {
  return (await verifyToken(token, "TEACHER")) as Teacher;
}

router.post(
  "/register",
  asyncHandler(async (req, res) => {
    const teacher = await validateObject(TeacherRegisterDto, req.body);
    await create(teacher);
    res.status(201).send({
      code: 0,
      message: "Teacher registered successfully",
    });
  })
);

router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const teacher = await validateObject(TeacherLoginDto, req.body);
    const databaseTeacher = await findOne(teacher.username);
    if (!databaseTeacher) {
      throw unauthorized("Invalid username");
    }
    if (!(await verify(databaseTeacher.password, teacher.password))) {
      unauthorized("Invalid password");
    }
    const token = sign({ username: teacher.username, type: "TEACHER" });
    res.json({
      code: 0,
      message: "Login success",
      data: {
        username: databaseTeacher.username,
        token,
      },
    });
  })
);

router.post(
  "/createStudent",
  asyncHandler(async (req, res) => {
    await verifyTeacherToken(req.header("Authorization"));
    const student = await validateObject(CreateStudentDto, req.body);
    const { username, password } = await createStudent(student.username);
    res.status(201).json({
      code: 0,
      message: "Create student success",
      data: {
        username,
        password,
      },
    });
  })
);

router.post(
  "/updateStudent",
  asyncHandler(async (req, res) => {
    await verifyTeacherToken(req.header("Authorization"));
    const { username, newUsername, newPassword, newScore } =
      await validateObject(UpdateStudentDto, req.body);
    await updateStudent({ username, newUsername, newPassword, newScore });
    res.status(201).json({
      code: 0,
      message: `Update student ${username} successfully`,
    });
  })
);

router.get(
  "/getStudents",
  asyncHandler(async (req, res) => {
    await verifyTeacherToken(req.header("Authorization"));
    const { page, limit } = await validateObject(AllStudentsDto, req.query);
    const students = (await allStudents(page, limit)).map((student) => {
      return {
        username: student.username,
        score: student.score,
        id: student._id as unknown as string,
      };
    });
    res.json({
      code: 0,
      message: "Get students successfully",
      data: students,
    });
  })
);

export default router;
