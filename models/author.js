var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var AuthorSchema = new Schema(
    {
        first_name: {type: String, required: true, max: 100},
        family_name: {type: String, required: true, max: 100},
        date_of_birth: {type: Date},
        date_of_death: {type: Date},
    }
);

// Virtual for author "full" name.
AuthorSchema.virtual('name').get(function() {
    var fullname = '';
  
    if (this.first_name && this.family_name) {
      fullname = this.family_name + ', ' + this.first_name;
    }
  
    if (!this.first_name && !this.family_name) {
      fullname = '';
    }
    return fullname;
});

// Virtual for author's lifespan
AuthorSchema
.virtual('lifespan').get(function() {
    var lifespan = 0;
    if(!this.date_of_death) {
        lifespan = (new Date().getFullYear() - this.date_of_birth.getYear()).toString();
    }
    else {
        lifespan = (this.date_of_death.getYear() - this.date_of_birth.getYear()).toString();
    }
    return lifespan;
});

// Virtual for author's URL
AuthorSchema
.virtual('URL')
.get(function() {
    return '/catalog/author/' + this._id;
});

// Export model
module.exports = mongoose.model('Author', AuthorSchema);