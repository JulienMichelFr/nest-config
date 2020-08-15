import { INestApplication } from '@nestjs/common';
import { ExposedConfig, WithoutExposeConfig } from '../src/configurations';
import { initModule } from '../src/init-module';

describe('With Transformer options', () => {
  let app: INestApplication;
  let config: ExposedConfig;

  it('should have unwanted value', async () => {
    app = await initModule<WithoutExposeConfig>(WithoutExposeConfig);
    config = app.get(WithoutExposeConfig);
    // @ts-ignore
    expect(config.appName).toBeDefined();
  });

  it('should apply transformer options', async () => {
    app = await initModule<ExposedConfig>(ExposedConfig, {
      transformerOptions: { excludeExtraneousValues: true },
    });
    config = app.get(ExposedConfig);
    expect(config.port).toEqual(3000);
    // @ts-ignore If excludeExtraneousValues is not applied, this value should be here
    expect(config.appName).toBeUndefined();
  });
});
