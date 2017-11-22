/**
 * freeCodeCamp - Back End Development Certification - Dynamic Web Application Projects
 * Helpers - Books
 * 
 * @author MLBORS
 * @version 1.0.0.0
 * @since 2017.11.20
 * @for freeCodeCamp
 */

/*******************/
/***** IMPORTS *****/
/*******************/

const dbBooks = require('../db/books')

/************************************************************/
/************************************************************/

const self = module.exports = {

  /**************************/
  /***** GET USER BOOKS *****/
  /**************************/

  /*
   * @var String id
   * @return Promise
   */

  getUserBooks: (id) => {
    return new Promise((resolve, reject) => {

      if (typeof id !== 'undefined' && id !== null && id) {

        dbBooks.findBy({user: id}, (err, data) => {
          if (err) reject(err)
          resolve(data)
        })  

      } else {
        resolve(null)
      }

    })
  },

  /************************************************************/
  /************************************************************/

  /********************/
  /***** GET BOOK *****/
  /********************/

  /*
   * @var String id
   * @return Promise
   */

  getBook: (id) => {
    return new Promise((resolve, reject) => {

      if (typeof id !== 'undefined' && id !== null && id) {

        dbBooks.findById(id, (err, data) => {
          if (err) reject(err)
          resolve(data)
        })  

      } else {
        resolve(null)
      }

    })
  }

}