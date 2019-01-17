const merge = require('lodash.merge');

module.exports = knexEnvConfig;
module.exports.withEnv = buildKnexConfig;

function knexEnvConfig(overrides) {
  return buildKnexConfig(process.env, overrides);
}

function buildKnexConfig(env, overrides){

  const knexConfig = deleteUndefinedKeys(merge({
    client: env.DATABASE_CLIENT,
    version: env.DATABASE_VERSION,
    debug: maybeBool(env.DATABASE_DEBUG),
    connection: env.DATABASE_URL || {
      user: env.DATABASE_USER,
      password: env.DATABASE_PASSWORD,
      host: env.DATABASE_HOST,
      database: env.DATABASE_NAME,
      filename: env.DATABASE_FILENAME,
      socketPath: env.DATABASE_SOCKET_PATH,
    },
    pool: {
      min: maybeInt(env.DATABASE_POOL_MIN),
      max: maybeInt(env.DATABASE_POOL_MAX),
    },
    seeds: {
      directory: env.DATABASE_SEEDS_DIRECTORY,
    },
    migrations: {
      directory: env.DATABASE_MIGRATIONS_DIRECTORY,
      tableName: env.DATABASE_MIGRATIONS_TABLE,
    },
  }, overrides));

  if(isEmptyObject(knexConfig.connection)) delete knexConfig.connection;
  if(isEmptyObject(knexConfig.pool)) delete knexConfig.pool;
  if(isEmptyObject(knexConfig.seeds)) delete knexConfig.seeds;
  if(isEmptyObject(knexConfig.migrations)) delete knexConfig.migrations;

  return knexConfig;
}

function maybeInt(n) {
  return Number.isNaN(n) ? undefined : n;
}

function maybeBool(v) {
  if(v === 'true' || v === true) return true;
  if(v === 'false' || v === false) return false;
  return undefined;
}

function isEmptyObject(object) {
  return Object.keys(object).length === 0;
}

function deleteUndefinedKeys(object) {
  for(let key in object) {
    const value = object[key];
    if(value == null) {
      delete object[key];
    } else if(typeof value === 'object') {
      object[key] = deleteUndefinedKeys(value);
    }
  }
  return object;
}
