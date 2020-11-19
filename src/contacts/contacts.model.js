const fs = require('fs').promises;
const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const contactsSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
});

contactsSchema.plugin(mongoosePaginate);

exports.ContactModel = mongoose.model('Contact', contactsSchema)


