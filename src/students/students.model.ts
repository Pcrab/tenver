import { model, Schema } from "mongoose";

export interface Student {
  username: string;
  password: string;
  score?: number;
}

const studentSchema = new Schema<Student>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
  },
});

const studentModel = model<Student>("Student", studentSchema);

export default studentModel;
