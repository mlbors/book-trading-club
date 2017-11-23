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
const usersHelpers = require('../helpers/users')

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

      if (err) return callback(err)
      
      db.collection('books').findOne({
        title: title
      }, (err, result) => {
        
        if (err) return callback(err)

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

      if (err) return callback(err)
      
      db.collection('books').findOne({
        _id: id
      }, (err, result) => {
        
        if (err) return callback(err)

        db.close()
        return callback(null, result)
      })

    })

  },

  /************************************************************/
  /************************************************************/

  /*******************/
  /***** FIND BY *****/
  /*******************/

  /*
   * @var Object query
   * @var Function callback a callback function
   */

  findBy: (query, callback) => {
    
    MongoClient.connect(dbUrl, (err, db) => {

      if (err)  return callback(err) 
      
      db.collection('books')
      .find(query)
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

  /********************/
  /***** ADD BOOK *****/
  /********************/

  /*
   * @var String title
   * @var String isbn
   * @var String description
   * @var String image
   * @var String user
   * @var Function callback a callback function
   */

  add: (title, isbn, description, image, user, callback) => {

    MongoClient.connect(dbUrl, (err, db) => {
      
      if (err) return callback(err)

      usersHelpers.getUserData(user).then((userData) => {

        db.collection('books').insertOne({
          _id: shortid.generate(),
          date: new Date(),
          title: title,
          isbn: isbn,
          description: description,
          image: image,
          user: user,
          userData: {
            username: userData.username,
            displayName: userData.displayName
          }
        },
        (err, res) => {
          db.close()
          return callback(err, res)
        })

      }).catch((err) => {
        db.close()
        return callback(err, res)
      })

    })

  },

  /************************************************************/
  /************************************************************/

  /******************/
  /***** UPDATE *****/
  /******************/

  /*
   * @var String id
   * @var String title
   * @var String isbn
   * @var String description
   * @var Function callback a callback function
   */

  update: (id, title, isbn, description, callback) => {
    
    MongoClient.connect(dbUrl, (err, db) => {
      
      if (err) return callback(err)
      
      db.collection('books').updateOne({
        _id: id
      },
      {
        $set: {
          title: title,
          isbn: isbn,
          description: description
        }
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

      if (err) return callback(err)
      
      db.collection('books').deleteOne({
        _id: id
      }, (err, result) => {
        
        if (err) return callback(err)

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

      if (err) return callback(err) 
      
      db.collection('books').deleteMany({}, (err, result) => {
        
        if (err) return callback(err)

        db.close()
        return callback(null, result)
      })

    })

  }

}