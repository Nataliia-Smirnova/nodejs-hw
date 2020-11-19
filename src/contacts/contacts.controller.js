const mongoosePaginate = require('mongoose-paginate-v2');
const { ContactModel } = require('./contacts.model');


exports.createContact = async (req, res, next) => {
    try {
        const newContact = await ContactModel.create(req.body);
        return res.status(201).send(newContact)
    } catch (error) {
        next(error)
    }
};

exports.getContacts = async (req, res, next) => {
    try {
        const { page, limit } = req.query;
        const options = {
            page,
            limit,
        };
        await ContactModel.paginate({}, options, function (err, result) {
            return res.status(200).send(result.docs);
        });;
    } catch (error) {
        next(error)
    }
};

exports.getContactById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const searchedContact = await ContactModel.findById(id);
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
        const updatedContact = await ContactModel.findByIdAndUpdate(id, req.body, {new: true});
        if (!updatedContact) {
            return res.status(404).send('Contact with such id is not found');
        };
        return res.status(200).send(updatedContact);

    } catch (error) {
        next(error)
    }
}

exports.removeContact = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedContact = await ContactModel.findByIdAndDelete(id);
        if (!deletedContact) {
            return res.status(404).send('Contact with such id is not found');
        };

        return res.status(204).send('Contact deleted');
    } catch (error) {
        next(error)
    }
}

