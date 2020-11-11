const fs = require('fs').promises;
const mongoose = require('mongoose');
const { Schema } = require('mongoose');


const contactsSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
})

exports.ContactModel = mongoose.model('Contact', contactsSchema)


// -----------------------------------------------------------------
// const path = require('path');
// const nanoid = require('nanoid');
// const { string } = require('joi');

// const contactsPath = path.join(__dirname, "../../db/contacts.json");

// async function addContact({ name, email, phone }) { 
//     const contactsList = await fs.readFile(contactsPath, "utf8");
//     const parsedContactsList = await JSON.parse(contactsList);
//     const id = nanoid.nanoid(4);
//     const newContact = { name, email, phone, id };
//     const newContactsList = [...parsedContactsList, newContact];

//     await fs.writeFile(contactsPath, JSON.stringify(newContactsList), err => { if (err) { console.log(err) } });

//     return newContact;
// }

// async function getAllContacts() {
//     const contactsList = await fs.readFile(contactsPath, "utf8");
//     return contactsList;
// }

// async function findContactById(id) {
//     const contactsList = await fs.readFile(contactsPath, "utf8");
//     const parsedContactsList = await JSON.parse(contactsList);
//     const searchedContact = parsedContactsList.find(el => el.id === id);
//     return searchedContact;
//  }

// async function deleteContact(id) {
//     const contactsList = await fs.readFile(contactsPath, "utf8");
//     const parsedContactsList = await JSON.parse(contactsList);
//     const contactIndex = parsedContactsList.findIndex(el => el.id === id);
//     if (contactIndex === -1) { return };

//     await parsedContactsList.splice(contactIndex, 1);
//     await fs.writeFile(contactsPath, JSON.stringify(parsedContactsList), err => { if (err) { console.log(err) } });
//  }

// async function updateContact(id, params) { 
//     const contactsList = await fs.readFile(contactsPath, "utf8");
//     const parsedContactsList = await JSON.parse(contactsList);
//     const contactIndex = parsedContactsList.findIndex(el => el.id === id);
//     if (contactIndex === -1) { return };

//     parsedContactsList[contactIndex] = { ...parsedContactsList[contactIndex], ...params };

//     await fs.writeFile(contactsPath, JSON.stringify(parsedContactsList), err => { if (err) { console.log(err) } });
//     return parsedContactsList[contactIndex];
// }




// module.exports = { addContact, getAllContacts, findContactById, deleteContact, updateContact }