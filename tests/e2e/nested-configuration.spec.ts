import { INestApplication } from '@nestjs/common';
import { initModule } from '../src/init-module';
import { NestedConfig } from '../src/configurations/nested.config';

describe('Nested configuration', () => {
  let app: INestApplication;
  let config: NestedConfig;

  beforeEach(async () => {
    app = await initModule<NestedConfig>(NestedConfig);
    config = app.get(NestedConfig);
  });

  it('should correctly validate nested', () => {
    expect<number>(config.database.port).toEqual(5432);
  });
});
