const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const autoIncrement = require('mongoose-auto-increment');
const Schema = mongoose.Schema;
autoIncrement.initialize(mongoose);

const messageSchema = new Schema({
   'user_id': {type: Number},
   'message_id': {type: Number},
   'message_text': {type: String},
   'date': {type: Date, default: Date.now}
}, { collection: 'Messages'});

messageSchema.plugin(uniqueValidator);
messageSchema.plugin(autoIncrement.plugin, {model: 'messageModel',
field: 'message_id', startAt: 200, incrementBy: 1});

const messageModel = mongoose.model('Message', messageSchema);
module.exports = messageModel;
