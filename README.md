## Description

Configuration module for [Nest](https://github.com/nestjs/nest) based on [config](https://github.com/lorenwest/node-config), [class-validator](https://github.com/typestack/class-validator), [class-transformer](https://github.com/typestack/class-transformer) packages.

## Installation

```bash
$ npm i --save @database01/nest-config class-validator class-transformer
```

## Quick Start

- Create a configuration in `<root>/config/default.(yaml|json)`. For more information, check [config](https://github.com/lorenwest/node-config)
```yaml
port: 3000
appId: 'my-app-id'
```
- Create the matching classes
```ts
import {IsString, IsNumber} from 'class-validator';

export class AppConfiguration {
  @IsNumber()
  port: number;

  @IsString()
  appId: string
}
```
- Import *ConfigModule* in your *AppModule*
```ts
import {Module} from '@nestjs/common';
import {ConfigModule} from '@database01/nest-config';
import {AppConfig} from './app.config';

@Module({
  imports: [
    ConfigModule.forRoot<AppConfig>(AppConfig)
  ]
})
export class AppModule {}
```
- Then you can access your configuration by injecting your configuration class
```ts
import {Injectable} from '@nestjs/common';
import { AppConfig } from './app.config';
@Injectable()
export class MyService {
  constructor(private readonly config: AppConfig) {}

  getAppId(): string {
    return this.config.appId;
  }
}
```

## Advanced configuration

*ConfigModule.forRoot* accept a second parameter matching this interface

```ts
import { ClassTransformOptions } from 'class-transformer';
import { ValidatorOptions } from 'class-validator/types/validation/ValidatorOptions';
import { ValidationError } from 'class-validator/types/validation/ValidationError';

export interface ConfigModuleOption {
  /**
   * If "true", registers `ConfigModule` as a global module.
   * See: https://docs.nestjs.com/modules#global-modules
   */
  isGlobal?: boolean;
  /**
   * Apply class-transformer options
   * See: https://github.com/typestack/class-transformer
   */
  transformerOptions?: ClassTransformOptions;
  /**
   * Apply class-validator options
   * See: https://github.com/typestack/class-validator
   */
  validatorOptions?: ValidatorOptions;
  /**
   * Apply transformation on received errors
   * It may be useful if you don't want to expose configuration in logs
   */
  errorTransformer?: (errors: ValidationError[]) => Promise<Error | Error[]>;
}

```
