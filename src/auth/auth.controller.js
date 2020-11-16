const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Conflict, Unauthorized, NotFound } = require("../helpers/errors");
const { UserModel } = require("../users/users.model");

exports.register = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            throw new Conflict('Email in use')
        }

        const passwordHash = await bcrypt.hash(password, +process.env.SALT_ROUNDS);
        const newUser = await UserModel.create({ email, password: passwordHash });

        res.status(201).send({
            id: newUser._id, email, subscription: newUser.subscription
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