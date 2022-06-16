import { model, Schema } from "mongoose";

export interface Teacher {
  username: string;
  password: string;
}

const teacherSchema = new Schema<Teacher>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const teacherModel = model<Teacher>("Teacher", teacherSchema);

export default teacherModel;
