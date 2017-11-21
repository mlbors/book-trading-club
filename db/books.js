/**
 * freeCodeCamp - Back End Development Certification - Dynamic Web Application Projects
 * Db - Books
 * 
 * @author MLBORS
 * @version 1.0.0.0
 * @since 2017.11.20
 * @for freeCodeCamp
 */

/*******************/
/***** IMPORTS *****/
/*******************/

const mongodb = require('mongodb')
const shortid = require('shortid')

const dbInfo = require('./db')

/************************************************************/
/************************************************************/

/********************/
/***** DATABASE *****/
/********************/

const MongoClient = mongodb.MongoClient
const dbUrl = dbInfo.info.url

/************************************************************/
/************************************************************/

const self = module.exports = {

  /********************/
  /***** FIND ALL *****/
  /********************/

  /*
   * @var Function callback a callback function
   * @return Array
   */

  findAll: (callback) => {
    
    MongoClient.connect(dbUrl, (err, db) => {
    
      if (err) return callback(err)
      
      db.collection('books')
      .find({})
      .sort({'date': -1})
      .toArray((err, result) => {
        if (err) return callback(err)
        db.close()
        return callback(null, result)
      })

    })

  },

  /************************************************************/
  /************************************************************/

  /*************************/
  /***** FIND BY TITLE *****/
  /*************************/

  /*
   * @var String title
   * @var Function callback a callback function
   */

  findByTitle: (title, callback) => {
    
    MongoClient.connect(dbUrl, (err, db) => {

      if (err) {
        return callback(err)
      } 
      
      db.collection('books').findOne({
        title: title
      }, (err, result) => {
        
        if (err) {
          return callback(err)
        }

        db.close()
        return callback(null, result)
      })

    })

  },

  /************************************************************/
  /************************************************************/

  /**********************/
  /***** FIND BY ID *****/
  /**********************/

  /*
   * @var String id user's id
   * @var Function callback a callback function
   */

  findById: (id, callback) => {
    
    MongoClient.connect(dbUrl, (err, db) => {

      if (err) {
        return callback(err)
      } 
      
      db.collection('books').findOne({
        _id: id
      }, (err, result) => {
        
        if (err) {
          return callback(err)
        }

        db.close()
        return callback(null, result)
      })

    })

  },

  /************************************************************/
  /************************************************************/

  /********************/
  /***** ADD BOOK *****/
  /********************/

  /*
   * @var String name book's name
   * @var Function callback a callback function
   */

  add: (name, callback) => {

    MongoClient.connect(dbUrl, (err, db) => {
      
      if (err) return callback(err)
      
      db.collection('stocks').insertOne({
        _id: shortid.generate(),
        date: new Date(),
        name: name
      },
      (err, res) => {
        db.close()
        return callback(err, res)
      })

    })

  },

  /************************************************************/
  /************************************************************/

  /***********************/
  /***** DELETE BOOK *****/
  /***********************/

  /*
   * @var String id book's id
   * @var Function callback a callback function
   */

  delete: (id, callback) => {
    
    MongoClient.connect(dbUrl, (err, db) => {

      if (err) {
        return callback(err)
      } 
      
      db.collection('books').deleteOne({
        id: id
      }, (err, result) => {
        
        if (err) {
          return callback(err)
        }

        db.close()
        return callback(null, result)
      })

    })

  },

  /************************************************************/
  /************************************************************/

  /**********************/
  /***** DELETE ALL *****/
  /**********************/

  /*
   * @var Function callback a callback function
   */

  deleteAll: (callback) => {
    
    MongoClient.connect(dbUrl, (err, db) => {

      if (err) {
        return callback(err)
      } 
      
      db.collection('books').deleteMany({}, (err, result) => {
        
        if (err) {
          return callback(err)
        }

        db.close()
        return callback(null, result)
      })

    })

  }

}