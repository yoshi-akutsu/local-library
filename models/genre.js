var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var GenreSchema = new Schema({
    name: {type: String, min: 3, max: 100, required: true}
});

// Virtual for URL
GenreSchema
.virtual('URL')
.get(function() {
    return '/catalog/genre/' + this._id;
})

// Export genreschema
module.exports = mongoose.model('Genre', GenreSchema);