const { Router } = require('express');
const { authorize } = require('../helpers/authorize.middleware');
const { getCurrentUser, updateUserSubscription } = require('./users.controller');

const router = Router();

router.get('/current', authorize, getCurrentUser);
router.patch('/current', authorize, updateUserSubscription);

exports.usersRouter = router;