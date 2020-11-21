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

        if (req.body.subscription === subscription) { throw new Conflict('You must choose different type of subscription');};
        const updatedUser = await UserModel.findByIdAndUpdate(id, req.body, { new: true });
        return res.status(200).send(updatedUser);
    } catch (error) {
        next(error);
    }
}