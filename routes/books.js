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

router.post('/add', (req, res) => {
  dbBooks.add(req.body.name, (err, result) => {
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
  dbBooks.delete(book, (err, result) => {
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