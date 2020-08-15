import { initModule } from '../src/init-module';
import { InvalidAppConfig } from '../src/configurations';
import { ValidationError } from 'class-validator';

describe('With validator options', () => {
  it('should apply validator options', () => {
    initModule<InvalidAppConfig>(InvalidAppConfig, {
      validatorOptions: { validationError: { target: false, value: false } },
    }).catch(([err]: ValidationError[]) => {
      expect(err.target).toBeUndefined();
      expect(err.value).toBeUndefined();
    });
  });
});
