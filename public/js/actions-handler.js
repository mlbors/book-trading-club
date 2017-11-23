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

  /*
   * @var Object _uiHandler Object that handles UI
   */

  let _uiHandler

  /************************************************************/
  /************************************************************/

  /**********/
  /********** MAKE REQUEST **********/
  /**********/

  /*
   * @var String url
   * @var String type
   * @var String action
   * @var Object data
   */

  _makeRequest = (url, type, action, data) => {
    return $.ajax({
      url: window.location.origin + url,
      type: type,
      cache: false,
      dataType: 'json',
      data: {
        action,
        data
      },
      succes: (result) => {
        return result
      },
      error: (err) => {
        return {error: err}
      }
    })
  }

  /************************************************************/
  /************************************************************/

  /**********/
  /********** HANDLE ACTION RESULT **********/
  /**********/

  /*
   * @var Object target
   * @var String action
   * @var Object data
   * @return Promise
   */

  _handleActionResult = (target, action, data) => {

    return new Promise((resolve, reject) => {

      switch (action) {
        case 'accept-trade':
          _uiHandler.manageMessageInfo(1, 'success', 'Trade accepted!')
          var li = $('li#' + data.trade)
          li.find('span.status').html(data.status)
          li.find('a.accept-trade').remove()
          li.find('a.decline-trade').remove()
          resolve()
          break

        case 'decline-trade':
          _uiHandler.manageMessageInfo(1, 'success', 'Trade declined!')
          var li = $('li#' + data.trade)
          li.find('span.status').html(data.status)
          li.find('a.accept-trade').remove()
          li.find('a.decline-trade').remove()
          resolve()
          break
  
        case 'close-trade':
          _uiHandler.manageMessageInfo(1, 'success', 'Trade closed!')
          var li = $('li#' + data.trade)
          li.find('span.status').html(data.status)
          li.find('a.close-trade').remove()
          li.append('<a class="btn btn-primary action delete-trade" href="#" data-action="delete-trade" data-id="' + data.trade + '">Remove trade</a>')
          resolve()
          break
  
        case 'delete-trade':
          _uiHandler.manageMessageInfo(1, 'success', 'Trade deleted!')
          var li = $('li#' + data.trade)
          li.remove()
          resolve()
          break
  
        case 'delete-book':
          _uiHandler.manageMessageInfo(1, 'success', 'Book deleted!')
          $('.grid div#' + data.book).remove()
          resolve()
          break

        case 'save-profile':
          _uiHandler.manageMessageInfo(1, 'success', 'Profile saved!')
          resolve({redirection: window.location.origin + '/users/profile/' + data.username})
          break

        case 'add-book':
          _uiHandler.manageMessageInfo(1, 'success', 'Book added!')
          $('#book-form').find("input[type=text], textarea").val('')
          resolve({redirection: window.location.origin})
          break

        case 'edit-book':
          _uiHandler.manageMessageInfo(1, 'success', 'Book edited!')
          resolve({redirection: window.location.origin})
          break

        case 'add-trade':
          _uiHandler.manageMessageInfo(1, 'success', 'Trade created!')
          $('#trade-form').find("input[type=text], textarea").val('')
          resolve({redirection: window.location.origin})
          break
      }
      
    })

  }

  /************************************************************/
  /************************************************************/

  /**********/
  /********** PREPARE ACTION **********/
  /**********/

  /*
   * @var Object target
   * @var String action
   * @return Promise
   */

  _prepareAction = (target, action) => {
    return new Promise((resolve, reject) => {

      let dataAction = {}
      
      let url = ''
      let type = ''
      let data = {}
  
      switch (action) {
        case 'accept-trade':
          url = '/trades/update-status'
          type = 'POST'
          data = {
            trade: target.attr('data-id'),
            status: 'accepted'
          }
          break
  
        case 'decline-trade':
          url = '/trades/update-status'
          type = 'POST'
          data = {
            trade: target.attr('data-id'),
            status: 'declined'
          }
          break
  
        case 'close-trade':
          url = '/trades/close'
          type = 'POST'
          data = {
            trade: target.attr('data-id'),
            status: 'closed'
          }
          break
  
        case 'delete-trade':
          url = '/trades/delete'
          type = 'DELETE'
          data = {
            trade: target.attr('data-id')
          }
          break
  
        case 'delete-book':
          url = '/books/delete'
          type = 'DELETE'
          data = {
            book: target.attr('data-id')
          }
          break
  
        case 'save-profile':
          url = '/users/save-profile'
          type = 'POST'
          data = {
            bio: $('#profil-form #bio').val(),
            username: $('#profil-form #username').val()
          }
          break
  
        case 'add-book':
          url = '/books/add'
          type = 'POST'
          data = {
            title: $('#book-form #title').val(),
            isbn: $('#book-form #isbn').val(),
            description: $('#book-form #description').val()
          }
          break
  
        case 'edit-book':
          url = '/books/update'
          type = 'POST'
          data = {
            title: $('#book-form #title').val(),
            isbn: $('#book-form #isbn').val(),
            description: $('#book-form #description').val(),
            book: $('#book-form #book').val()
          }
          break
  
        case 'add-trade':
          url = '/trades/add'
          type = 'POST'
          data = {
            title: $('#trade-form #title').val(),
            description: $('#trade-form #description').val(),
            book: $('#trade-form #book').val(),
            receiver: $('#trade-form #receiver').val()
          }
          break
      }
  
      dataAction = {
        url: url,
        type: type,
        data: data
      }
  
      resolve(dataAction)

    })
  }

  /************************************************************/
  /************************************************************/

  /**********/
  /********** ACTION SUBMIT **********/
  /**********/

  /*
   * @return Bool
   */
  
  _actionSubmit = () => {
    $(document).on('submit', 'form.action-form', (e) => {
      e.preventDefault()

      _uiHandler.manageMessageInfo(0, null, null)

      const target = $(e.currentTarget)
      const action = target.attr('data-action')

      _prepareAction(target, action).then((dataAction) => {
        
        _makeRequest(dataAction.url, dataAction.type, action, JSON.stringify(dataAction.data)).then((result) => {
          
          if (result.error !== null) {
            console.warn('Error during request...')
            console.error(result.error)
            _uiHandler.manageMessageInfo(1, 'danger', result.error)
            return false
          }
  
          if (result.info === null) {

            _handleActionResult(target, action, dataAction.data).then((handleResult) => {
              setTimeout(() => {
                if (typeof handleResult.redirection !== 'undefined' && handleResult.redirection !== null) {
                  _uiHandler.manageMessageInfo(0, null, null)
                  window.location.replace(handleResult.redirection)
                }
              }, 5000)
              return false
            }).catch((err) => {
              console.warn('Error during request...')
              console.error(err)
              _uiHandler.manageMessageInfo(1, 'danger', result.error)
              return false
            })

          } else {
            console.log(result.info)
            _uiHandler.manageMessageInfo(1, 'warning', result.info)
            return false
          }

        }).catch((err) => {
          console.warn('Error during request...')
          console.error(err)
          _uiHandler.manageMessageInfo(1, 'danger', result.error)
          return false
        })

      }).catch((err) => {
        console.warn('Error while preparing data...')
        console.error(err)
        _uiHandler.manageMessageInfo(1, 'danger', result.error)
        return false
      })

    })
  } 
   
  /************************************************************/
  /************************************************************/

  /**********/
  /********** ACTION CLICK **********/
  /**********/

  /*
   * @return Bool
   */

  _actionClick = () => {
    $(document).on('click', 'a.btn.action', (e) => {
      e.preventDefault()

      _uiHandler.manageMessageInfo(0, null, null)

      const target = $(e.currentTarget)
      const action = target.attr('data-action')

      _prepareAction(target, action).then((dataAction) => {

        _makeRequest(dataAction.url, dataAction.type, action, JSON.stringify(dataAction.data)).then((result) => {
          
          if (result.error !== null) {
            console.warn('Error during request...')
            console.error(result.error)
            _uiHandler.manageMessageInfo(1, 'danger', result.error)
            return false
          }
  
          if (result.info === null) {

            _handleActionResult(target, action, dataAction.data).then(() => {
              setTimeout(() => {
                _uiHandler.manageMessageInfo(0, null, null)
              }, 5000)
              return false
            }).catch((err) => {
              console.warn('Error during request...')
              console.error(err)
              _uiHandler.manageMessageInfo(1, 'danger', result.error)
              return false
            })

          } else {
            console.log(result.info)
            _uiHandler.manageMessageInfo(1, 'warning', result.info)
            return false
          }

        }).catch((err) => {
          console.warn('Error during request...')
          console.error(err)
          _uiHandler.manageMessageInfo(1, 'danger', result.error)
          return false
        })

      }).catch((err) => {
        console.warn('Error while preparing data...')
        console.error(err)
        _uiHandler.manageMessageInfo(1, 'danger', result.error)
        return false
      })

    })
  }

  /************************************************************/
  /************************************************************/

  /**********/
  /********** HANDLE SUBMIT **********/
  /**********/

  _handleActionsSubmit = () => {
    return () => {
      _actionSubmit()
    }
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
  /********** SET UI HANDLER **********/
  /**********/

  /*
   * @var Object uiHandler Object that handles UI
   */

  _setUiHandler = (uiHandler) => {
    _uiHandler = uiHandler
  }

  /************************************************************/
  /************************************************************/

  return {

    /**********/
    /********** INIT **********/
    /**********/

    /*
     * @var Object uiHandler Object that handles UI
     */

    init: (uiHandler) => {
      _setUiHandler(uiHandler)
      const actionsHandler = _handleActionsClick()
      const submitHandler = _handleActionsSubmit()
      actionsHandler()
      submitHandler()
    }

  }

}