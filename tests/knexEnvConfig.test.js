const knexEnvConfig = require('../index');

describe('knexEnvConfig', () => {
  test('Should return a blank object if the env has no options and no overrides are passed', () => {
    const config = knexEnvConfig.withEnv({});
    expect(config).toEqual({});
  });

  test('Should include a connection object if connection env values are set', () => {
    const DATABASE_NAME = 'test_database';
    const DATABASE_PASSWORD = 'test_database_password';
    const DATABASE_CLIENT = 'test_database_client';
    const config = knexEnvConfig.withEnv({
      DATABASE_CLIENT,
      DATABASE_NAME,
      DATABASE_PASSWORD,
    });

    expect(config).toEqual({
      client: DATABASE_CLIENT,
      connection: { database: DATABASE_NAME, password: DATABASE_PASSWORD }
    });
  });

  test('Should prioritize connection URL over other connection fields', () => {
    const DATABASE_NAME = 'test_database';
    const DATABASE_URL = 'test_database_url';
    const config = knexEnvConfig.withEnv({
      DATABASE_NAME,
      DATABASE_URL,
    });

    expect(config).toEqual({ connection: DATABASE_URL });
  });

  test('Should deeply merge overrides if they are passed', () => {
    const DATABASE_NAME = 'test_database';
    const DATABASE_PASSWORD = 'test_database_password';
    const DATABASE_CLIENT = 'test_database_client';
    const DATABASE_POOL_MIN = '100';
    const DATABASE_POOL_MAX = '1000';
    const overrides = {
      client: 'test_override_client',
      connection: {
        database: 'test_override_database',
      },
      pool: {
        max: 3000,
      }
    };

    const config = knexEnvConfig.withEnv({
      DATABASE_CLIENT,
      DATABASE_NAME,
      DATABASE_PASSWORD,
      DATABASE_POOL_MIN,
      DATABASE_POOL_MAX,
    }, overrides);

    expect(config).toEqual({
      client: overrides.client,
      connection: {
        database: overrides.connection.database,
        password: DATABASE_PASSWORD,
      },
      pool: {
        min: DATABASE_POOL_MIN,
        max: overrides.pool.max,
      }
    });
  });
});
