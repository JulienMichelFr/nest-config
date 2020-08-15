import { ClassType } from 'class-transformer/ClassTransformer';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { ConfigModule, ConfigModuleOption } from '../../lib';

export async function initModule<T>(
  baseClass: ClassType<T>,
  options?: ConfigModuleOption,
): Promise<INestApplication> {
  const module = await Test.createTestingModule({
    imports: [ConfigModule.forRoot<T>(baseClass, options)],
  }).compile();

  const app = module.createNestApplication();
  await app.init();
  return app;
}
