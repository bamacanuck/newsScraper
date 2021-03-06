var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new NoteSchema object
// This is similar to a Sequelize model
var commSchema = new Schema({
	articleId: {
		type: Schema.Types.ObjectId,
		ref: "Article"
	},
	  // `body` is of type String
	  body: String
});

// This creates our model from the above schema, using mongoose's model method
var Comment = mongoose.model("Comment", commSchema);

// Export the Note model
module.exports = Comment;