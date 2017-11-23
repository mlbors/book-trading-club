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
        percentPosition: true,
        gutter: 10
      })
    }
  }

  /************************************************************/
  /************************************************************/

  return {

    /**********/
    /********** INIT **********/
    /**********/

    init: () => {
      const handler = _handleUIClick()
      const masonry = _initMasonry()

      handler()
      masonry()

    },

    /************************************************************/
    /************************************************************/

    /**********/
    /********** MANAGE MESSAGE INFO **********/
    /**********/

    manageMessageInfo: (state, type, content) => {

      if ($('#message-info').length > 0) {

        switch(state) {
          case 0:
            $('#message-info').hide()
            $('#message-info .content').removeClass('alert-success alert-info alert-warning alert-danger')
            $('#message-info .content p').html('')
            break

          case 1:
            $('#message-info .content').addClass('alert-' + type)
            $('#message-info .content p').html(content)
            $('#message-info').show()
            break
        }

      }

    }

  }

}