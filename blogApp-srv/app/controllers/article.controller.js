const db = require('../models');
const Article = db.articles;

exports.create = (req, res) =>
{
    if(!req.body.title)
    {
        res.status(400).send({ message: 'title cannot be empty' });
        return;
    }

    const article = new Article(
        {
            title: req.body.title,
            description: req.body.description,
            image: req.body.image,
            content: req.body.content,
            published: req.body.published ? req.body.published : false
        }
    );

    article
        .save(article)
        .then(data =>
            {
                res.send(data);
            })
        .catch(err =>
            {
                res.status(500).send(
                    {
                        message: err.message || 'error while creating article'
                    }
                );
            });
};

exports.findAll = (req, res) =>
{
    const title = req.query.title;
    var condition = title ? { title: { $regex: new RegEx(title), $options: 'i' } } : {};

    Article.find(condition)
        .then(data =>
            {
                res.send(data);
            })
        .catch(err =>
            {
                res.status(500).send(
                    {
                        message: err.message || 'error getting articles'
                    }
                );
            });
};

exports.findOne = (req, res) =>
{
    const id = req.params.id;

    Article.findById(id)
        .then(data =>
            {
                if(!data)
                    res.status(404).send({ message: 'article not found' });
                else
                    res.send(data);
            })
        .catch(err =>
            {
                res.status(500).send({ message: 'error getting article' });
            });
};

exports.update = (req, res) =>
{
    if(!req.body)
        return res.status(400).send(
            {
                message: 'data cannot be empty'
            }
        );
    
    const id = req.params.id;

    Article.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
            .then(data =>
                {
                    if(!data)
                        res.status(404).send({
                            message: 'cannot update article'
                        });
                    else
                        res.send({ message: 'tutorial updated'});
                })
            .catch(err =>
                {
                    res.status(500).send(
                        {
                            message: 'error while updating article'
                        }
                    );
                });
};

exports.delete = (req, res) =>
{
    const id = req.params.id;

    Article.findByIdAndRemove(id)
        .then(data =>
            {
                if(!data)
                    res.status(404).send(
                        {
                            message: 'cannot delete article'
                        }
                    );
                else
                    res.send({ message: 'article deleted' });
            })
        .catch(err =>
            {
                res.status(500).send(
                    {
                        message: 'error while deleting article'
                    }
                );
            });
};

exports.findAllPublished = (req, res) =>
{
    Article.find({ published: true })
        .then(data =>
            {
                res.send(data);
            })
        .catch(err =>
            {
                res.status(500).send(
                    {
                        message: err.message || 'error while getting articles'
                    }
                );
            });
};
