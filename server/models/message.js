var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var config = require('../../_config');

var Message = new Schema({
  messageBody: { type: String },
  messageTo: { type: Schema.Types.ObjectId },
  messageFrom: { type: Schema.Types.ObjectId }
}, {timestamps: true });


module.exports = mongoose.model('messages', Message);
