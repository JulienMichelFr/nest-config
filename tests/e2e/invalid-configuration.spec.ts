import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { ConfigModule } from '../../lib';
import { InvalidAppConfig } from '../src/configurations';
import { ConfigModuleOption } from '../../lib/interfaces';
import { ValidationError } from 'class-validator';
import { initModule } from '../src/init-module';

describe('Valid configuration', () => {
  let app: INestApplication;

  it('should throw an errors at initialization', async () => {
    await expect(initModule(InvalidAppConfig)).rejects.toBeInstanceOf(Array);
  });

  it('should transform errors', async () => {
    async function errorTransformer(errors: ValidationError[]): Promise<Error> {
      return new Error('Invalid configuration');
    }
    initModule(InvalidAppConfig, { errorTransformer }).catch(err => {
      expect<Error>(err).toBeInstanceOf(Error);
      expect<string>(err.message).toEqual('Invalid configuration');
    });
  });
});
