import { IsString, ValidateNested } from 'class-validator';

export class DatabaseConfig {
  @IsString()
  type: string;

  @IsString()
  port: number;

  @IsString()
  uri: string;
}

export class NestedConfig {
  @ValidateNested()
  database: DatabaseConfig;
}
