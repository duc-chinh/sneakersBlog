const mongoose = require('mongoose');

var schema = mongoose.Schema(
    {
        firstName: String,
        lastName: String,
        login: String,
        password: String
    }
);

schema.method('toJSON', function()
{
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = mongoose.model('User', schema);
