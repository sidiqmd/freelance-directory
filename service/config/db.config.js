require('dotenv').config()
const Sequelize = require('sequelize');

// // Constants
const db_dialect = process.env.DB_DIALECT || 'mariadb';
const db_name = process.env.DB_NAME || 'freedirdb';
const db_username = process.env.DB_USERNAME || 'freediruser';
const db_password = process.env.DB_PASSWORD || 'P@ssw0rd';
const db_host = process.env.DB_HOST || 'localhost';
const db_port = process.env.DB_PORT || 3307;

const sequelize = new Sequelize(db_name, db_username, db_password, {
    host: db_host,
    port: db_port,
    dialect: db_dialect,
    operatorsAliases: false,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Models/tables
db.user = require('../model/user.model.js')(sequelize, Sequelize);
// db.skillset = require('../model/skillset.model.js')(sequelize, Sequelize);
// db.hobby = require('../model/hobby.model.js')(sequelize, Sequelize);

// Models/tables Association
// db.user.hasMany(db.skillset);
// db.user.hasMany(db.hobby);
// db.skillset.belongsTo(db.user);
// db.hobby.belongsTo(db.user);

module.exports = db;