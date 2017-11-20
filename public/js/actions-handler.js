/**
 * freeCodeCamp - Back End Development Certification - Dynamic Web Application Projects
 * Actions Handler
 * 
 * @author MLBORS
 * @version 1.0.0.0
 * @since 2017.11.20
 * @for freeCodeCamp
 */

/****************/
/***** MAIN *****/
/****************/

const ActionsHandler = () => {

  /**********/
  /********** VARS **********/
  /**********/

  /************************************************************/
  /************************************************************/

  /**********/
  /********** ACTION CLICK **********/
  /**********/

  _actionClick = () => {
    $(document).on('click', 'a.btn.action', (e) => {
      e.preventDefault()
      return false
    })

  }

   /************************************************************/
  /************************************************************/

  /**********/
  /********** HANDLE CLICK **********/
  /**********/

  _handleActionsClick = () => {
    return () => {
      _actionClick()
    }
  }

  /************************************************************/
  /************************************************************/

  /**********/
  /********** INIT **********/
  /**********/

  return {
    init: () => {
      const handler = _handleActionsClick()
      handler()
    }
  }

}