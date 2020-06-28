const Message = require('./../models/messages');
const _ = require('lodash');

exports.createMessage = (req,res,next) => {
  const message = new Message(req.body);
  message.user_id = req.body.user_id;
  message.message_text = req.body.message_text;
  message.save().then((msgDocs) => {
      res.status(200).json({
          message: 'Message successfully sent!',
          msgData: msgDocs
      });
  }).catch((error) => {
      res.status(500).json({
        message: error.message
      });
  });
}

exports.readMessages = (req,res,next) => {
  Message.find({}).sort({date: -1 }).then((msgDocs) => {
      let msgData = _.filter(msgDocs, (msg) => {
          return parseInt(msg.user_id) === parseInt(req.body.user_id);
      });
      res.status(200).json({
          message: 'Messages successfully fetched!',
          msgData: msgData
      });
  }).catch((error) => {
      res.status(500).json({
        message: error.message
      });
  });
}
