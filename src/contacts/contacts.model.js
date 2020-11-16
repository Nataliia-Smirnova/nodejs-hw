const fs = require('fs').promises;
const mongoose = require('mongoose');
const { Schema } = require('mongoose');


const contactsSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
})

exports.ContactModel = mongoose.model('Contact', contactsSchema)


