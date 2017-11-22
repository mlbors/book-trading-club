/**
 * freeCodeCamp - Back End Development Certification - Dynamic Web Application Projects
 * Helpers - Trades
 * 
 * @author MLBORS
 * @version 1.0.0.0
 * @since 2017.11.20
 * @for freeCodeCamp
 */

/*******************/
/***** IMPORTS *****/
/*******************/

const dbTrades = require('../db/trades')

/************************************************************/
/************************************************************/

const self = module.exports = {

  /***************************/
  /***** GET USER TRADES *****/
  /***************************/

  /*
   * @var String id
   * @return Promise
   */

  getUserTrades: (id) => {
    return new Promise((resolve, reject) => {

      if (typeof id !== 'undefined' && id !== null && id) {

        dbTrades.findBy({sender: id}, (err, data) => {
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

  /*******************************/
  /***** GET RECIEVED TRADES *****/
  /*******************************/

  /*
   * @var String id
   * @return Promise
   */

  getRecievedTrades: (id) => {
    return new Promise((resolve, reject) => {

      if (typeof id !== 'undefined' && id !== null && id) {

        dbTrades.findBy({receiver: id}, (err, data) => {
          if (err) reject(err)
          resolve(data)
        })  

      } else {
        resolve(null)
      }

    })
  }

}