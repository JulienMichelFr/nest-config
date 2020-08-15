import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppConfig } from '../src/configurations';
import config from 'config';
import { ConfigModule } from '../../lib';
import { initModule } from '../src/init-module';

describe('Valid configuration', () => {
  let app: INestApplication;

  beforeEach(async () => {
    app = await initModule<AppConfig>(AppConfig);
  });

  it('should create config provider', () => {
    const appConfig = app.get(AppConfig);
    expect(appConfig).toBeDefined();
  });

  describe('Check fields', () => {
    let appConfig: AppConfig;
    beforeEach(() => {
      appConfig = app.get(AppConfig);
    });

    it('should create field appName', () => {
      expect(appConfig.appName).toBeDefined();
      expect(appConfig.appName).toEqual(config.get<string>('appName'));
    });

    it('should create field port', () => {
      expect(appConfig.port).toBeDefined();
      expect(appConfig.port).toEqual(config.get<string>('port'));
    });
  });
});
