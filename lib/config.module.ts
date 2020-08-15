import { DynamicModule, Module, Provider } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { ClassType } from 'class-transformer/ClassTransformer';
import config from 'config';
import { validate } from 'class-validator';
import { ConfigModuleOption } from './interfaces';

@Module({})
export class ConfigModule {
  static forRoot<T>(
    baseClass: ClassType<T>,
    options?: ConfigModuleOption,
  ): DynamicModule {
    const provider: Provider = {
      provide: baseClass,
      useFactory: async () => {
        return ConfigModule.parseConfig<T>(baseClass, options);
      },
    };
    return {
      module: ConfigModule,
      global: options?.isGlobal,
      providers: [provider],
      exports: [provider],
    };
  }

  private static async parseConfig<T>(
    baseClass: ClassType<T>,
    {
      transformerOptions,
      validatorOptions,
      errorTransformer,
    }: ConfigModuleOption = {},
  ): Promise<T> {
    const parsed: T = plainToClass(
      baseClass,
      config.util.toObject(),
      transformerOptions,
    ) as T;
    const errors = await validate(parsed, validatorOptions);
    if (errors.length) {
      if (!(errorTransformer && typeof errorTransformer === 'function')) {
        throw errors;
      }
      throw await errorTransformer(errors);
    }
    return parsed;
  }
}
