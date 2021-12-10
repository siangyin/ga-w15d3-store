const mongoose = require("mongoose");

// only property pass in schema will be pass to MongoDB, whatever come extra will be ignored.
const ProductSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "must provide name"],
		trim: true,
		maxlength: [30, "cannot more than 30 characters"],
	},
	description: {
		type: String,
	},
	img: {
		type: String,
		required: [true, "product image must be provided"],
	},
	price: {
		type: Number,
		required: [true, "product price must be provided"],
		min: 0.1,
	},
	qty: {
		type: Number,
		min: 0,
		default: 0,
	},
});

module.exports = mongoose.model("Product", ProductSchema);
