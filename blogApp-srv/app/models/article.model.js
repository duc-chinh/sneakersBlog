module.exports = mongoose =>
{
    var schema = mongoose.Schema(
        {
            title: String,
            description: String,
            image: String,
            content: String,
            published: Boolean
        },
        { timestamps: true }
    );

    schema.method('toJSON', function()
    {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Article = mongoose.model('article', schema);

    return Article;
};
