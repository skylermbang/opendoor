const mongoose = require("mongoose")
const { Schema } = mongoose
const autoIncrement = require('mongoose-auto-increment');
var connection = mongoose.createConnection("mongodb://localhost:27017/opendoor");
autoIncrement.initialize(connection);

const comment = new Schema(
	{
		comment_content: { type: String, required: true },
		comment_target_id: { type: String, required: true },
		user_id: { type: String, required: true, index: true },
		createdAt: {
			type: String,
			default: Date.now()
		},
		archived: { type: Number, default: null },
		archived_at: { type: Date, default: null }
	},
	{ timestamps: true }
);

comment.plugin(autoIncrement.plugin, {
	model: '_id',
	field: 'id',
	startAt: 0,
	increment: 1
})

module.exports = mongoose.model('Comment', comment);