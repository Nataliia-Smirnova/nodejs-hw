const { addContact, getAllContacts, findContactById, updateContact, deleteContact } = require("./contacts.model")

exports.createContact = async (req, res, next) => {
    try {
        const newContact = await addContact(req.body);
        return res.status(201).send(newContact)
    } catch (error) {
        next(error)
    }
};

exports.getContacts = async (req, res, next) => {
    try {
        const allContacts = await getAllContacts();
        return res.status(200).send(allContacts);
    } catch (error) {
        next(error)
    }
};

exports.getContactById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const searchedContact = await findContactById(id);
        if (!searchedContact) {
            return res.status(404).send('Contact with such id is not found');
        }
        return res.status(200).send(searchedContact);
    } catch (error) {
        next(error)
    }
};

exports.updateContactById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const searchedContact = await findContactById(id);
        if (!searchedContact) {
            return res.status(404).send('Contact with such id is not found');
        };
        const updatedContact = await updateContact(id, req.body);
        return res.status(200).send(updatedContact);

    } catch (error) {
        next(error)
    }
}

exports.removeContact = async (req, res, next) => {
    try {
        const { id } = req.params;
        const searchedContact = await findContactById(id);
        if (!searchedContact) {
            return res.status(404).send('Contact with such id is not found');
        };
        await deleteContact(id);

        return res.status(204).send('Contact deleted');
    } catch (error) {
        next(error)
    }
}