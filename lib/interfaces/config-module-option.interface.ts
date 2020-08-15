import { ClassTransformOptions } from 'class-transformer';
import { ValidationError } from 'class-validator/types/validation/ValidationError';
import { ValidatorOptions } from 'class-validator';

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
