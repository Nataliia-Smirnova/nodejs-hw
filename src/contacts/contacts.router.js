const { Router } = require('express');
const { createContact, getContacts, getContactById, updateContactById, removeContact } = require('./contacts.controller');
const { validate } = require('../helpers/validate.middleware');
const { createContactSchema, updateContactSchema, validateIdSchema } = require('./contacts.schemes');

const router = Router();

router.post('/', validate(createContactSchema), createContact);

router.get('/', getContacts);

router.get('/:id', validate(validateIdSchema, 'params'), getContactById);

router.patch('/:id', validate(validateIdSchema, 'params'), validate(updateContactSchema), updateContactById);

router.delete('/:id', validate(validateIdSchema, 'params'), removeContact)

exports.contactsRouter = router;
