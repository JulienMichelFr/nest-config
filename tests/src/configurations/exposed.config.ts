import { IsNumber } from 'class-validator';
import { Expose } from 'class-transformer';

export class ExposedConfig {
  @IsNumber()
  @Expose()
  port: number;
}

export class WithoutExposeConfig {
  @IsNumber()
  port: number;
}
