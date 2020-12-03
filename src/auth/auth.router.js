const { Router } = require('express');
const { authorize } = require('../helpers/authorize.middleware');
const { validate } = require('../helpers/validate.middleware');
const { register, login, logout, verify } = require('./auth.controller')
const { registerSchema } = require('./auth.schemes')

const router = Router();

router.post('/register', validate(registerSchema), register);
router.post('/login', validate(registerSchema), login);
router.delete('/logout', authorize, logout);
router.get('/verify/:verificationToken', verify)

exports.authRouter = router;