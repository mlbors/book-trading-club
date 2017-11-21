/**
 * freeCodeCamp - Back End Development Certification - Dynamic Web Application Projects
 * UI Handler
 * 
 * @author MLBORS
 * @version 1.0.0.0
 * @since 2017.11.20
 * @for freeCodeCamp
 */

/****************/
/***** MAIN *****/
/****************/

const UIHandler = () => {

  /**********/
  /********** VARS **********/
  /**********/

  /************************************************************/
  /************************************************************/

  /**********/
  /********** HANDLE CLICK **********/
  /**********/

  _handleUIClick = () => {
    return () => {
      
    }
  }

  /************************************************************/
  /************************************************************/

  /**********/
  /********** MASONRY **********/
  /**********/

  _initMasonry = () => {
    return () => {
      $('.grid').masonry({
        itemSelector: '.grid-item',
        columnWidth: '.grid-sizer',
        percentPosition: true
      })
    }
  }

  /************************************************************/
  /************************************************************/

  /**********/
  /********** INIT **********/
  /**********/

  return {
    init: () => {
      const handler = _handleUIClick()
      const masonry = _initMasonry()

      handler()
      masonry()

    }
  }

}