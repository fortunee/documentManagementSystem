import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';

const connection = new Sequelize(process.env.database,
  process.env.username, process.env.password, {
    host: 'localhost',
    dialect: 'postgres',
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    },
    logging: false
  });

const db = {};

fs
  .readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0) && (file !== 'config.js'))
  .forEach((file) => {
    const model = connection.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.connection = connection;
db.Sequelize = Sequelize;


module.exports = db;
