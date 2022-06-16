import express from "express";
import asyncHandler from "express-async-handler";
import { validateObject } from "../common/utils/validate";
import { findOne } from "./students.service";
import { StudentLoginDto } from "./dto/login-students.dto";
import { badRequest } from "../common/utils/responses";

const router = express.Router();

router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const student = await validateObject(StudentLoginDto, req.body);
    const databaseStudent = await findOne(student.username);
    if (!databaseStudent) {
      throw badRequest("Invalid username or password");
    }
    if (!databaseStudent.score) {
      throw badRequest("Student has no score");
    }
    res.json({
      code: 0,
      message: "Get score success",
      data: {
        username: databaseStudent.username,
        score: databaseStudent.score,
      },
    });
  })
);

export default router;
