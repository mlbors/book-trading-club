/**
 * freeCodeCamp - Back End Development Certification - Dynamic Web Application Projects
 * Services - Google Books
 * 
 * @author MLBORS
 * @version 1.0.0.0
 * @since 2017.11.11
 * @for freeCodeCamp
 */

/*******************/
/***** IMPORTS *****/
/*******************/

const express = require('express')
const request = require('request')

require('dotenv').config()

/************************************************************/
/************************************************************/

/****************/
/***** INIT *****/
/****************/

const googleBooksApi = {
  api_key: process.env.GOOGLE_BOOKS_API_KEY,
  api_url: 'https://www.googleapis.com/books/v1/volumes?key=' + api_key
}

/************************************************************/
/************************************************************/

const self = module.exports = {

  /********************/
  /***** GET DATA *****/
  /********************/

  /*
   * @var String isbn
   * @return Promise
   */

  getData: (isbn) => {
    return new Promise((resolve, reject) => {

      const url = googleBooksApi.api_url + '?q=isbn:' + isbn

      request(url, (error, response, body) => {

        const data = JSON.parse(body)

        if (!error && response.statusCode == 200) {

          if (typeof data === 'undefined' || data === null) {
            resolve({
              data: null,
              error: 'No data',
              status: response.statusCode,
              response: response
            })
            return
          }

          resolve({
            data: data,
            error: null,
            status: response.statusCode,
            response: response
          })
          return
        }

        reject({
          error: error,
          status: response.statusCode,
          response: response
        })
        return

      })

    })
  }

}