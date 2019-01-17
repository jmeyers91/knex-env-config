# Knex Env Config

Create [Knex](https://knexjs.org/) config objects with defaults loaded from the environment.

## Usage

### Install

```bash
npm install knex-env-config
```

### Example

Create a Knex config object by calling `knexEnvConfig` and pass it to the `Knex` constructor:

```js
import Knex from 'knex';
import knexEnvConfig from 'knex-env-config';

const knexConfig = knexEnvConfig();
const knex = Knex(knexConfig);
```

Or override some options:

```js
const knexConfig = knexEnvConfig({
  client: 'sqlite3',
  connection: {
    filename: 'database.sqlite',
  },
});

const knex = Knex(knexConfig);
```

Or pass a custom `env` object:

```js
const env = {
  DATABASE_USER: 'root'
};
const knexConfig = knexEnvConfig.withEnv({
  client: 'pg',
  connection: {
    host: 'localhost',
  },
}, env);

const knex = Knex(knexConfig);
```

## Supported options

See the [Knex docs](https://knexjs.org/) for more info.

|env key|knex option|
|-|-|
|`DATABASE_CLIENT`|`client`||
|`DATABASE_VERSION`|`version`||
|`DATABASE_DEBUG`|`debug`||
|`DATABASE_URL`|`connection`||
|`DATABASE_USER`|`connection.user`||
|`DATABASE_PASSWORD`|`connection.password`||
|`DATABASE_HOST`|`connection.host`||
|`DATABASE_NAME`|`connection.database`||
|`DATABASE_FILENAME`|`connection.filename`||
|`DATABASE_SOCKET_PATH`|`connection.socketPath`||
|`DATABASE_POOL_MIN`|`pool.min`||
|`DATABASE_POOL_MAX`|`pool.max`||
|`DATABASE_SEEDS_DIRECTORY`|`seeds.directory`||
|`DATABASE_MIGRATIONS_DIRECTORY`|`migrations.directory`||
|`DATABASE_MIGRATIONS_TABLE`|`migrations.tableName`||