const { Router } = require('express');
const { authorize } = require('../helpers/authorize.middleware');
const { imageUpload } = require('../helpers/imageUpload');
const { getCurrentUser, updateUserSubscription, updateUserAvatar } = require('./users.controller');

const router = Router();

router.get('/current', authorize, getCurrentUser);
router.patch('/current', authorize, updateUserSubscription);
router.patch('/current/avatar', authorize, imageUpload, updateUserAvatar);

exports.usersRouter = router;