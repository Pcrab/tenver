import { IsDefined, IsOptional, Length, Matches } from "class-validator";
import { Expose } from "class-transformer";

export class UpdateTeacherDto {
  @Length(2, 20)
  @IsDefined()
  @Expose()
  username: string;

  @Length(2, 20)
  @IsOptional()
  @Expose()
  newUsername?: string;

  @Length(8, 128)
  @IsOptional()
  @Expose()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,128}$/
  )
  newPassword?: string;

  constructor(username: string, newUsername?: string, newPassword?: string) {
    this.username = username;
    this.newUsername = newUsername;
    this.newPassword = newPassword;
  }
}
