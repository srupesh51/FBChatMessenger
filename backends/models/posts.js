const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const autoIncrement = require('mongoose-auto-increment');
const Schema = mongoose.Schema;
autoIncrement.initialize(mongoose);

const postSchema = new Schema({
   'post_id': {type: Number},
   'post_title': {type: String},
   'post_desc': {type: String},
   'post_text': {type: String},
   'date': {type: Date, default: Date.now}
}, { collection: 'Posts'});

postSchema.plugin(uniqueValidator);
postSchema.plugin(autoIncrement.plugin, {model: 'postModel',
field: 'post_id', startAt: 200, incrementBy: 1});

const postModel = mongoose.model('Post', postSchema);
module.exports = postModel;
