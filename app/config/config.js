
module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: '127.0.0.1',
    port: '5432',
    dialect: 'postgres'
  },
  test: {
    username: 'root',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    port: '5432',
    dialect: 'postgres'
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    username: 'root',
    password: null,
    database: 'database_production',
    dialect: 'postgres'
  }
};
