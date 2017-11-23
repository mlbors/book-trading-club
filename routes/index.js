/**
 * freeCodeCamp - Back End Development Certification - Dynamic Web Application Projects
 * Routes - Index
 * 
 * @author MLBORS
 * @version 1.0.0.0
 * @since 2017.11.20
 * @for freeCodeCamp
 */

/*******************/
/***** IMPORTS *****/
/*******************/

var express = require('express')
var router = express.Router()

const auth = require('./auth')
const logout = require('./logout')
const books = require('./books')
const trades = require('./trades')
const dbBooks = require('../db/books')

/************************************************************/
/************************************************************/

/****************/
/***** HOME *****/
/****************/

router.get('/', (req, res) => {

  dbBooks.findAll((err, results) => {

    res.render('index', {
      title: 'List of books',
      auth: req.isAuthenticated(),
      user: req.user,
      error: err,
      books: results
    })

  })
  
})

/************************************************************/
/************************************************************/

/****************/
/***** AUTH *****/
/****************/

router.use('/auth', auth)

/************************************************************/
/************************************************************/

/******************/
/***** LOGOUT *****/
/******************/

router.use('/logout', logout)

/************************************************************/
/************************************************************/

/*****************/
/***** BOOKS *****/
/*****************/

router.use('/books', books)

/************************************************************/
/************************************************************/

/******************/
/***** TRADES *****/
/******************/

router.use('/trades', trades)

/************************************************************/
/************************************************************/

/*******************/
/***** EXPORTS *****/
/*******************/

module.exports = router
