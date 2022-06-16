import { IsOptional, Min } from "class-validator";
import { Expose } from "class-transformer";

export class AllStudentsDto {
  @Expose()
  @IsOptional()
  @Min(0)
  page?: number;

  @IsOptional()
  @Expose()
  @Min(1)
  limit?: number;

  constructor(page?: number, limit?: number) {
    this.page = page;
    this.limit = limit;
  }
}
