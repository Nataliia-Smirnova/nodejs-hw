const jwt = require('jsonwebtoken');
const { Unauthorized } = require('./errors');
const {UserModel} = require('../users/users.model')

exports.authorize = async (req, res, next) => {
    try {
        const authHeader = req.get("Authorization") || '';
        const token = authHeader.replace('Bearer ', '');

        let payload;
        try {
            payload = jwt.verify(token, process.env.JWT_SECRET)
        } catch (error) {
            throw new Unauthorized('Not authorized')
        }

        const user = await UserModel.findOne({_id: payload.userId, token});
        if (!user) {
            throw new Unauthorized('Not authorized')
        }
        req.user = user;
        req.token = token;

        next(); 
    } catch (error) {
        next(error);
    }  
}