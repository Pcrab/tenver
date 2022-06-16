import express, { Request, Response, NextFunction } from "express";
import teachersRouter from "./teachers/teachers.controller";
import studentsRouter from "./students/students.controller";
import Logger from "./common/logger";
import bodyParser from "body-parser";
import cors from "cors";
import * as path from "path";
import * as fs from "fs";
import { badRequest } from "./common/utils/responses";
import { execSync } from "child_process";

const app = express();
const logger = Logger;

app.use(
  cors({
    origin: "*",
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: false,
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/teachers", teachersRouter);
app.use("/students", studentsRouter);

app.use(express.static(path.resolve(__dirname, "../cv/videos")));

app.get("/videos/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  const fileReg = new RegExp("^output-\\d+\\.mp4$");
  const filePath = path.resolve(__dirname, "../cv/videos", id);
  const counts: number[] = [];
  try {
    fs.readdirSync(filePath).forEach((file) => {
      if (file.match(fileReg)) {
        const frameNum = file.split("-")[1].split(".")[0];
        counts.push(parseInt(frameNum, 10));
      }
    });
  } catch (e) {
    console.log(e);
    throw badRequest("Check video numbers failed");
  }

  res.json({
    code: 0,
    message: "Get videos count success",
    data: {
      counts,
    },
  });
});

app.get("/video/:id/:video", (req: Request, res: Response) => {
  const id = req.params.id;
  const video = req.params.video;
  const videoPath = path.resolve(__dirname, `../cv/videos/${id}/${video}`);
  fs.readFile(videoPath, (err, data) => {
    if (err) {
      throw err;
    }
    res.send(data);
  });
});

app.get("/first", (req: Request, res: Response) => {
  execSync("python3 cv/getFirstFrame.py");
  res.sendFile(path.resolve(__dirname, "../cv/video/first.jpg"));
});

app.use((req: Request, res: Response, _next: NextFunction) => {
  res.status(404).send({ code: 404, error: "Not found" });
  logger.warn(
    `${res.statusCode} - ${res.statusMessage} - ${req.method} - ${req.originalUrl} - ${req.ip}`
  );
});

app.use((err: any, req: Request, res: Response, _next: NextFunction) => {
  console.log(err);
  try {
    const { code, message } = err;
    res.status(code).json({ code, message });
    logger.debug(
      `${code} - ${res.statusMessage} - ${req.method} - ${req.originalUrl} - ${req.ip}`
    );
  } catch (e) {
    res
      .status(500)
      .json({ code: 500, error: "Unknown Internal Server Error Found!" });
    logger.error(
      `${err.code || 500} - ${res.statusMessage} - ${req.method} - ${
        req.originalUrl
      } - ${req.ip}`
    );
  }
});

export default app;
