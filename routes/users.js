/**
 * freeCodeCamp - Back End Development Certification - Dynamic Web Application Projects
 * Routes - Users
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

const dbUsers = require('../db/users')
const tradesBooks = require('../helpers/books')
const usersHelper = require('../helpers/users')
const tradesHelper = require('../helpers/trades')

/************************************************************/
/************************************************************/

/******************/
/***** STATUS *****/
/******************/

router.get('/status', (req, res) => {
  res.send({
    auth: req.isAuthenticated()
  })
})

/************************************************************/
/************************************************************/

/*******************/
/***** PROFILE *****/
/*******************/

router.get('/profile/:username', (req, res) => {

  usersHelper.getUserDataByUsername(req.params.username).then((data) => {
    return Promise.all(data, tradesHelper.getUserTrades(req.user))
  }).then(([data, userTrades]) => {
    return Promise.all(data, userTrades, tradesHelper.getRecievedTrades(req.user))
  }).then(([data, userTrades, receivedTrades]) => {
    return Promise.all(data, userTrades, receivedTrades, booksHelper.getUserBooks(req.user))
  }).then(([data, userTrades, receivedTrades, books]) => {
    res.render('user-profile', {
      title: 'User profile',
      auth: req.isAuthenticated(),
      data: data,
      userTrades: userTrades,
      receivedTrades: receivedTrades,
      books: books,
      error: null
    })
  }).catch((err) => {
    res.render('user-profile', {
      title: 'User profile',
      auth: req.isAuthenticated(),
      data: null,
      userTrades: null,
      receivedTrades: null,
      books: null,
      error: err
    })
  })

})

/************************************************************/
/************************************************************/

/************************/
/***** EDIT PROFILE *****/
/************************/

router.post('/edit-profile/:id', (req, res) => {

  usersHelper.getUserData(req.params.id).then((data) => {
    res.render('user-profile', {
      title: 'Edit profile',
      auth: req.isAuthenticated(),
      data: data,
      error: null
    })
  }).catch((err) => {
    res.render('user-profile', {
      title: 'Edit profile',
      auth: req.isAuthenticated(),
      data: null,
      error: err
    })
  })
  
})

/************************************************************/
/************************************************************/

/************************/
/***** SAVE PROFILE *****/
/************************/

router.post('/save-profile', (req, res) => {

  const data = JSON.parse(req.body.data)

  dbUsers.update(req.user, data.bio, (err, result) => {
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
