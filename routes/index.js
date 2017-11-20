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
const dbBooks = require('../db/books')

/************************************************************/
/************************************************************/

/****************/
/***** HOME *****/
/****************/

router.get('/', (req, res) => {

  dbStocks.findAll((err, results) => {
    
    let chartData, chartLabels

    if (typeof results !== 'undefined' && results !== null && results !== '') {
      chartData = results.map((d) => d.data)
      chartLabels = results.map((d) => d.name)
    }

    res.render('index', {
      title: 'Stocks',
      auth: req.isAuthenticated(),
      error: err,
      chartData: {
        datasets:[{
          data: chartData
        }],
        labels: chartLabels
      },
      stocks: chartLabels
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

/*******************/
/***** EXPORTS *****/
/*******************/

module.exports = router
