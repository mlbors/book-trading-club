/**
 * freeCodeCamp - Back End Development Certification - Dynamic Web Application Projects
 * Routes - Trades
 * 
 * @author MLBORS
 * @version 1.0.0.0
 * @since 2017.11.20
 * @for freeCodeCamp
 */

/*******************/
/***** IMPORTS *****/
/*******************/

var express = require('express');
var router = express.Router();

const dbTrades = require('../db/trades')
const booksHelper = require('../helpers/books')

/************************************************************/
/************************************************************/

/******************/
/***** CREATE *****/
/******************/

router.get('/edit/:book/:receiver', (req, res) => {
  
  res.render('book-form', {
    title: 'Create trade',
    auth: req.isAuthenticated(),
    book: req.params.book,
    receiver: req.params.receiver,
    error: null
  })
  
})

/************************************************************/
/************************************************************/

/***************/
/***** ADD *****/
/***************/

router.post('/add', (req, res) => {

  const data = JSON.parse(req.body.data)

  booksHelper.getBook(data.book).then((bookData) => {
    dbTrades.add(data.title, data.description, data.book, bookData.title, data.receiver, req.user, (err, result) => {
      res.send({
        auth: req.isAuthenticated(),
        info: null,
        result: result,
        error: err
      })
    })
  }).catch((err) => {
    res.send({
      auth: req.isAuthenticated(),
      info: null,
      result: null,
      error: err
    })
  })

})

/************************************************************/
/************************************************************/

/*****************/
/***** CLOSE *****/
/*****************/

router.post('/close', (req, res) => {

  const data = JSON.parse(req.body.data)

  dbTrades.close(data.trade, (err, result) => {
    res.send({
      auth: req.isAuthenticated(),
      info: null,
      result: result,
      error: err
    })
  })
})

/************************************************************/
/************************************************************/

/*************************/
/***** UPDATE STATUS *****/
/*************************/

router.post('/update-status', (req, res) => {

  const data = JSON.parse(req.body.data)

  dbTrades.updateStatus(req.body.trade, req.body.status, (err, result) => {
    res.send({
      auth: req.isAuthenticated(),
      info: null,
      result: result,
      error: err
    })
  })
})

/************************************************************/
/************************************************************/

/******************/
/***** DELETE *****/
/******************/

router.post('/delete', (req, res) => {

  const data = JSON.parse(req.body.data)

  dbTrades.delete(req.body.trade, (err, result) => {
    res.send({
      auth: req.isAuthenticated(),
      info: null,
      result: result,
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
