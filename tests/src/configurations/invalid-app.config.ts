import { IsNumber, IsString } from 'class-validator';

export class InvalidAppConfig {
  @IsNumber()
  unknownKey: number;

  @IsString()
  filename: string;

  @IsString()
  port: string;
}
