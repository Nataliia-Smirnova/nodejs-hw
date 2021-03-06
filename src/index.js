const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') })

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const { contactsRouter } = require('./contacts/contacts.router');
const { usersRouter } = require('./users/users.router');
const { authRouter } = require('./auth/auth.router');


exports.CrudServer = class {
    constructor() {
        this.app = null;
    }

    async start() {
        this.initServer();
        await this.initDatabase();
        this.initMiddlewares();
        this.initRoutes();
        this.initErrorHandling();
        this.startListening();
    }

    initServer() {
        this.app = express();
        this.app.use('/images', express.static(__dirname + '/public/images'))
    }

    async initDatabase() {
        try {
            await mongoose.connect(process.env.MONGODB_URL, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false,
            });
            console.log('Database connection successful');
        } catch (error) {
            console.log(error);
            process.exit(1);
        }
    }

    initMiddlewares() {
        this.app.use(express.json());
        this.app.use(morgan('tiny'));
    }

    initRoutes() { 
        this.app.use('/contacts', contactsRouter)
        this.app.use('/auth', authRouter)
        this.app.use('/users', usersRouter)
    }
    
    initErrorHandling() {
        this.app.use((err, req, res, next) => {
            const statusCode = err.status || 500;
            return res.status(statusCode).send(err.message);
        })
    }

    startListening() {
        const { PORT } = process.env;
        this.app.listen(PORT, () => {
            console.log('Server started listening on port', PORT);
        })
    }
}