require('dotenv').config()

const express = require('express')
const app = express()

// Constants
const app_host = process.env.APP_INTERNAL_HOST || '0.0.0.0';
const app_port = process.env.APP_INTERNAL_PORT || 3000;
const context_path = process.env.APP_CONTEXT_PATH || '/freedir';

const db = require('./config/db.config.js');


db.sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully to MariaDB.');

        // force: true will drop the table if it already exists
        // db.sequelize.sync({ force: true }).then(() => {
        //     console.log('Drop and Resync with { force: true }');
        // });
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });



app.use(express.json())
app.use(context_path, require('./routes/routes'))

// Server
app.listen(app_port, app_host, () => console.log(`Running on http://${app_host}:${app_port}`))