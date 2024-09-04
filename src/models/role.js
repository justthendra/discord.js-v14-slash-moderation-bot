const mongoose = require('mongoose');

const roleData = new mongoose.Schema({
    guildId: { type: String, required: true },
    roleId: { type: String, required: true }
});

module.exports = mongoose.model('Role', roleData);