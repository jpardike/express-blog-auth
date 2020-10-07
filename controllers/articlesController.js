const express = require('express');
const router = express.Router();

// Database
const db = require('../models');

// Current Path = '/articles'

// GET index
router.get('/', (req, res) => {
  // Get data for all articles
  db.Article.find({}, (err, allArticles) => {
    if (err) return console.log(err);

    const context = { allArticles };

    // render template
    res.render('articles/index', context);
  })
});

// GET new
router.get('/new', (req, res) => {
  db.Author.find({}, (err, allAuthors) => {
    if (err) return console.log(err);

    const context = {
      authors: allAuthors
    };

    res.render('articles/new', context);
  });
});

// GET show
router.get('/:articleId', (req, res) => {
  db.Article.findById(req.params.articleId)
    .populate('author')
    .exec((err, articleById) => {
      if (err) return console.log(err);

      console.log('articleById:', articleById);
      
      res.render('articles/show', articleById);
    });
});

// POST create
router.post('/', (req, res) => {
  db.Article.create(req.body, (err, newArticle) => {
    if (err) return console.log(err);

    db.Author.findById(req.body.author, (err, foundAuthor) => {
      if (err) return console.log(err);

      foundAuthor.articles.push(newArticle._id);
      foundAuthor.save((err, savedAuthor) => {
        if (err) return console.log(err);

        res.redirect(`/articles/${newArticle.id}`);
      })
    })

  });
});

// GET edit
router.get('/:articleId/edit', (req, res) => {
  db.Article.findById(req.params.articleId, (err, foundArticle) => {
    if (err) return console.log(err);

    const context = {
      article: foundArticle,
    }

    res.render('articles/edit', context);
  });
})

// DELETE destroy
router.delete('/:articleId', (req, res) => {
  db.Article.findByIdAndDelete(req.params.articleId, (err) => {
    if (err) return console.log(err);

    res.redirect('/articles');
  });
});

// PUT update
router.put('/:articleId', (req, res) => {
  // make query to update database
  db.Article.findByIdAndUpdate(
    req.params.articleId,
    req.body,
    { new: true },
    (err, updatedArticle) => {
      if (err) return console.log(err);
      
      // redirect to show route for that article
      res.redirect(`/articles/${updatedArticle.id}`);
    }
  );
});

module.exports = router;