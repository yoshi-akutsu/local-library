var mongoose = require('mongoose');
var moment = require('moment');

var Schema = mongoose.Schema;

var BookInstanceSchema = new Schema({
    book: {type: Schema.Types.ObjectId, ref: 'Book', required: true},
    imprint: {type: String, required: true},
    status: {type: String, required: true, enum: ['Available', 'Maintainence', 'Loaned', 'Reserved'], default: 'Maintainence'},
    due_back: {type: Date, default: Date.now}
});

// Virtual for date formatting using moment
BookInstanceSchema
.virtual('due_back_formatted')
.get(function() {
    return moment(this.due_back).format('MMMM Do, YYYY');
})




// Virtual for bookinstance's URL
BookInstanceSchema
.virtual('URL')
.get(function() {
    return '/catalog/bookinstance/' + this._id;
});

// Export bookinstance model
module.exports = mongoose.model('BookInstance', BookInstanceSchema);