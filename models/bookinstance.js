var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BookInstanceSchema = new Schema({
    book: {type: Schema.Types.ObjectId, ref: 'Book', required: true},
    imprint: {type: String, required: true},
    status: {type: String, required: true, enum: ['Available', 'Maintainence', 'Loaned', 'Reserved'], default: 'Maintainence'},
    due_back: {type: Date, default: Date.now}
});

// Virtual for bookinstance's URL
BookInstanceSchema
.virtual('URL')
.get(() => {
    return '/catalog/bookinstance/' + this._id;
});

// Export bookinstance model
module.exports = mongoose.model('BookInstance', BookInstanceSchema);