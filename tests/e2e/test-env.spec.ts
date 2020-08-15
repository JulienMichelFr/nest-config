import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { ConfigModule } from '../../lib';
import { AppConfig } from '../src/configurations';
import { initModule } from '../src/init-module';

describe('Test env', () => {
  let app: INestApplication;

  beforeEach(async () => {
    app = await initModule<AppConfig>(AppConfig);
  });

  it('should load from test.yaml', () => {
    const appConfig = app.get(AppConfig);
    expect(appConfig.filename).toEqual('test.yaml');
  });
});
