const { Conflict } = require("../helpers/errors");
const { UserModel } = require("./users.model");

exports.getCurrentUser = async (req, res, next) => {
    const { id, email, subscription } = req.user;
    
    res.status(200).send({ id, email, subscription });
};

exports.updateUserSubscription = async (req, res, next) => {
    try {
        const { id, subscription } = req.user;
        const subscriptionTypes = UserModel.schema.tree.subscription.enum;
        if (!subscriptionTypes.includes(req.body.subscription)) { throw new Conflict('There is no such subscription type'); };

        if (req.body.subscription === subscription) { throw new Conflict('You must choose different type of subscription'); };
        const updatedUser = await UserModel.findByIdAndUpdate(id, req.body, { new: true });
        return res.status(200).send(updatedUser);
    } catch (error) {
        next(error);
    }
};


exports.updateUserAvatar = async (req, res, next) => {
    try {
        const { _id } = req.user;
        const { filename } = req.file;

        const newAvatarURL = `http://localhost:3000/images/${filename}`;
        const updatedUser = await UserModel.findByIdAndUpdate(_id, {avatarURL: newAvatarURL}, { new: true });
        return res.status(200).send({avatarURL: updatedUser.avatarURL});
    } catch (error) {
        next(error);
    }
}