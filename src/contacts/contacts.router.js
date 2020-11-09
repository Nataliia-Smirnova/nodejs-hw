const { Router } = require('express');
const { createContact, getContacts, getContactById, updateContactById, removeContact } = require('./contacts.controller');
const { validate } = require('../helpers/validate.middleware');
const { createContactSchema, updateContactSchema } = require('./contacts.schemes');

const router = Router();

router.post('/', validate(createContactSchema), createContact);

router.get('/', getContacts);

router.get('/:id', getContactById);

router.patch('/:id', validate(updateContactSchema), updateContactById);

router.delete('/:id', removeContact)

exports.contactsRouter = router;
