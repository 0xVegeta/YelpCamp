const mongoose = require("mongoose");
const Review = require("./review");
const User = require("./user");
const Schema = mongoose.Schema;

const CampgroundSchema = new Schema({
	idx: Number,
	title: String,
	image: [
		{
			url: String,
			filename: String,
		},
	],
	price: Number,
	description: String,
	location: String,
	author: {
		type: Schema.Types.ObjectId,
		ref: "User",
	},
	reviews: [
		{
			type: Schema.Types.ObjectId,
			ref: "Review",
		},
	],
});

CampgroundSchema.post("findOneAndDelete", async (doc) => {
	if (doc) {
		await Review.remove({
			_id: {
				$in: doc.reviews,
			},
		});
	}
});

module.exports = mongoose.model("Campground", CampgroundSchema);
