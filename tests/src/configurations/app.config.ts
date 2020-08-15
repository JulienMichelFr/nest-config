import { IsNumber, IsString } from 'class-validator';
import { Expose } from 'class-transformer';

export class AppConfig {
  @Expose()
  @IsNumber()
  port: number;

  @Expose()
  @IsString()
  appName: string;

  @Expose()
  @IsString()
  filename: string;
}
