/**
 * freeCodeCamp - Back End Development Certification - Dynamic Web Application Projects
 * Routes - Books
 * 
 * @author MLBORS
 * @version 1.0.0.0
 * @since 2017.11.20
 * @for freeCodeCamp
 */

/*******************/
/***** IMPORTS *****/
/*******************/

const express = require('express')
const router = express.Router()

const dbBooks= require('../db/books')
const googleBooksService = require('../services/google-books')

/************************************************************/
/************************************************************/

/****************/
/***** LIST *****/
/****************/

router.get('/', (req, res) => {
  dbBooks.findAll((err, results) => {
    res.send({
      books: results,
      info: null,
      auth: req.isAuthenticated(),
      error: err
    })
  })
})

/************************************************************/
/************************************************************/

/***************/
/***** ADD *****/
/***************/

router.get('/add', (req, res) => {

  res.render('book-form', {
    title: 'Add book',
    auth: req.isAuthenticated(),
    dataAction: 'add-book',
    action: '/books/add',
    submit: 'Add',
    book: null,
    error: err
  })

})

/************************************************************/
/************************************************************/

/****************/
/***** EDIT *****/
/****************/

router.get('/edit/:id', (req, res) => {

  dbBooks.findAll(req.params.id, (err, result) => {
    res.render('book-form', {
      title: 'Edit book',
      auth: req.isAuthenticated(),
      dataAction: 'edit-book',
      action: '/books/update',
      submit: 'Update',
      book: result,
      error: err
    })
  })

})
  
/************************************************************/
/************************************************************/

/***************/
/***** ADD *****/
/***************/

router.post('/add', (req, res) => {

  const data = JSON.parse(req.body.data)

  let cover = null

  if (data.isbn !== null && data.isbn === '') {
    googleBooksService.getData(data.isbn).then((bookData) => {
      
      console.log(bookData)

      if (bookData.items[0].imageLinks.medium !== null) {
        cover = bookData.items[0].imageLinks.medium
      }
      
      dbBooks.add(data.title, data.isbn, data.description, cover, req.user, (err, result) => {
        res.send({
          result: result,
          info: null,
          auth: req.isAuthenticated(),
          error: err
        })
      })
  
    }).catch((err) => {
      res.send({
        result: null,
        info: null,
        auth: req.isAuthenticated(),
        error: err
      })
    })

  } else {
    dbBooks.add(data.title, data.isbn, data.description, cover, req.user, (err, result) => {
      res.send({
        result: result,
        info: null,
        auth: req.isAuthenticated(),
        error: err
      })
    })
  }

})

/************************************************************/
/************************************************************/

/*********************/
/***** SAVE EDIT *****/
/*********************/

router.post('/update', (req, res) => {
  const data = JSON.parse(req.body.data)

  dbBooks.update(data.book, data.title, data.isbn, data.description, (err, result) => {
    res.send({
      result: result,
      info: null,
      auth: req.isAuthenticated(),
      error: err
    })
  })

})

/************************************************************/
/************************************************************/

/******************/
/***** DELETE *****/
/******************/

router.delete('/delete', (req, res) => {

  const data = JSON.parse(req.body.data)

  dbBooks.delete(data.book, (err, result) => {
    res.send({
      result: result,
      info: null,
      auth: req.isAuthenticated(),
      error: err
    })
  })

})

/************************************************************/
/************************************************************/

/*****/
/***** INDEX *****/
/*****/

router.get('/search/:term', (req, res) => {

  dbBooks.findByTitle(req.params.term, (err, result) => {
    res.send({
      result: result,
      info: null,
      auth: req.isAuthenticated(),
      error: err
    })
  })
	
})

/************************************************************/
/************************************************************/

/*******************/
/***** EXPORTS *****/
/*******************/

module.exports = router;