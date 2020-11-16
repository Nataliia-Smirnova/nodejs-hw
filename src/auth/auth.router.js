const { Router } = require('express');
const { validate } = require('../helpers/validate.middleware');
const { register, login } = require('./auth.controller')
const { registerSchema } = require('./auth.schemes')

const router = Router();

router.post('/register', validate(registerSchema), register);
router.post('/login', validate(registerSchema), login)



exports.authRouter = router;