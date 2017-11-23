/**
 * freeCodeCamp - Back End Development Certification - Dynamic Web Application Projects
 * Db - Trades
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
      
      db.collection('trades')
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

  /**********************/
  /***** FIND BY ID *****/
  /**********************/

  /*
   * @var String id
   * @var Function callback a callback function
   */

  findById: (id, callback) => {
    
    MongoClient.connect(dbUrl, (err, db) => {

      return callback(err)
      
      db.collection('trades').findOne({
        _id: id
      }, (err, result) => {
        
        return callback(err)

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
      
      db.collection('trades')
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

  /*********************/
  /***** ADD TRADE *****/
  /*********************/

  /*
   * @var String title
   * @var String description
   * @var String book
   * @var String bookTitle
   * @var String receiver
   * @var String sender
   * @var Function callback a callback function
   */

  add: (title, description, book, bookTitle, receiver, sender, callback) => {

    MongoClient.connect(dbUrl, (err, db) => {
      
      if (err) return callback(err)
      
      db.collection('trades').insertOne({
        _id: shortid.generate(),
        date: new Date(),
        title: title,
        description: description,
        book: book,
        bookTitle: bookTitle,
        receiver: receiver,
        sender: sender,
        status: 'open',
        closed: false
      },
      (err, res) => {
        db.close()
        return callback(err, res)
      })

    })

  },

  /************************************************************/
  /************************************************************/

  /*****************/
  /***** CLOSE *****/
  /*****************/

  /*
   * @var String id
   * @var Function callback a callback function
   */

  close: (id, callback) => {
    
    MongoClient.connect(dbUrl, (err, db) => {
      
      if (err) return callback(err)
      
      db.collection('trades').updateOne({
        _id: id
      },
      {
        $set: {
          closed: true,
          status: 'closed'
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

  /*************************/
  /***** UPDATE STATUS *****/
  /*************************/

  /*
   * @var String id
   * @var String status
   * @var Function callback a callback function
   */

  updateStatus: (id, status, callback) => {
    
    MongoClient.connect(dbUrl, (err, db) => {
      
      if (err) return callback(err)
      
      db.collection('trades').updateOne({
        _id: id
      },
      {
        $set: {
          status: status
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
   * @var String id trade's id
   * @var Function callback a callback function
   */

  delete: (id, callback) => {
    
    MongoClient.connect(dbUrl, (err, db) => {

      if (err) return callback(err)
      
      db.collection('trades').deleteOne({
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
      
      db.collection('trades').deleteMany({}, (err, result) => {
        
        if (err) return callback(err)

        db.close()
        return callback(null, result)
      })

    })

  }

}