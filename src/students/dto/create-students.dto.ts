import { IsDefined, IsOptional, Length, Matches } from "class-validator";
import { Expose } from "class-transformer";

export class CreateStudentDto {
  @Length(2, 20)
  @IsDefined()
  @Expose()
  username: string;

  @Length(8, 128)
  @IsOptional()
  @Expose()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,128}$/
  )
  password?: string;

  constructor(username: string, password?: string) {
    this.username = username;
    this.password = password;
  }
}
