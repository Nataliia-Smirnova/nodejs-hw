const fs = require("fs");
const path = require("path");
const nanoid = require('nanoid');

const contactsPath = path.join(__dirname, "./db/contacts.json");

function listContacts() {
    fs.readFile(contactsPath, "utf-8", (err, data) => {
        console.log(JSON.parse(data))
    })
}

function getContactById(contactId) {
    fs.readFile(contactsPath, "utf-8", (err, data) => {
        const searchedContact = JSON.parse(data).find(el => el.id === contactId);
        console.log(searchedContact);
    })
}

function removeContact(contactId) {
    fs.readFile(contactsPath, "utf-8", (err, data) => {
        const filteredContacts = JSON.parse(data).filter(el => el.id !== contactId);
        // console.log(filteredContacts);
        fs.writeFile(contactsPath, JSON.stringify(filteredContacts), (err) => { if (err) { console.log(err); } })
    })
}

function addContact(name, email, phone) {
    fs.readFile(contactsPath, "utf-8", (err, data) => {
        const prevContacts = JSON.parse(data);
        const newContact = {
            id: nanoid.nanoid(2),
            name, email, phone
        };
        const newContactsList = [...prevContacts, newContact];
        // console.log(newContactsList);
        fs.writeFile(contactsPath, JSON.stringify(newContactsList), err => { if (err) { console.log(err) } })
    })
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
}
