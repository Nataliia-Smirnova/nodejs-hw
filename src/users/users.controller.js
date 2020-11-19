
exports.getCurrentUser = async (req, res, next) => {
    const { id, email, subscription } = req.user;
    
    res.status(200).send({ id, email, subscription });
}