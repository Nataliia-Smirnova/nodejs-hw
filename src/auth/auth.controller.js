const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { avatarGenerator } = require('../helpers/avatarGenerator');
const { Conflict, Unauthorized, NotFound } = require("../helpers/errors");
const { UserModel } = require("../users/users.model");
const { promises: fsPromises } = require("fs");
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { verificationEmailSend } = require('../helpers/verificationEmailSend');

exports.register = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            throw new Conflict('Email in use')
        }

        const avatarName = await avatarGenerator(email);
        const avatarURL = `http://localhost:${process.env.PORT}/images/${avatarName}`
        const verificationToken = uuidv4();
        const passwordHash = await bcrypt.hash(password, +process.env.SALT_ROUNDS);
        const newUser = await UserModel.create({ email, password: passwordHash, avatarURL, verificationToken });
        
        const src = path.join(__dirname, (`../public/tmp/${avatarName}`));
        const dest = path.join(__dirname, (`../public/images/${avatarName}`));
        await fsPromises.link(src, dest);
        await fsPromises.unlink(src);
        
        await verificationEmailSend(email, verificationToken);
        res.status(201).send({
            id: newUser._id, email, subscription: newUser.subscription, avatarURL
        })
    } catch (error) {
        next(error);
    }
}

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const existingUser = await UserModel.findOne({ email });
        if (!existingUser) { throw new NotFound('User not found') };

        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) { throw new Unauthorized('Email or password is wrong') };

        const token = jwt.sign({ userId: existingUser._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
        await UserModel.findByIdAndUpdate(existingUser._id, { $set: { token } });

        res.status(200).send({
            token,
            user: { email, subscription: existingUser.subscription}
        })
    } catch (error) {
        next(error)
    }
}


exports.logout = async (req, res, next) => {
    try {
        const { user, token } = req;

        await UserModel.updateOne({ _id: user.id }, { $set: { token: "" } });
        return res.status(204).send()
    } catch (error) {
        next(error);
    }
}

exports.verify = async (req, res, next) => {
    try {
        const { verificationToken } = req.params;
        const updatedUser = await UserModel.findOneAndUpdate({ verificationToken }, { $set: { verificationToken: "" } }) ;
        if (!updatedUser) { throw new NotFound('User not found') };
        return res.status(200).send();
    } catch (error) {
        next(error);
    }
}