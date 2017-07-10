$(function(){

  // fade in menu shadow on scroll
  var $doc = $(document)
  var $menuTopShadow = $('#menu-top-shadow')
  var $hamburgerButton = $('#hamburger-button')
  var $items = $('#items')

  /*
   * Desktop Menu
   */

  $(document).scroll(function() {
    if ($menuTopShadow.is(':visible')) {
      if ($doc.scrollTop() > 50) {
        $menuTopShadow.css({ opacity: 1 })
      } else {
        $menuTopShadow.css({ opacity: 0 })
      }
    }
  })

  /*
   * Mobile Menu
   */

  var mobileMenuIsVisible = false
  function showMenu () {
    mobileMenuIsVisible = true
    $items.css({
      '-webkit-transform': 'translateX(0px)',
      transform: 'translateX(0px)'
    })
  }
  function hideMenu () {
    mobileMenuIsVisible = false
    $items.css({
      '-webkit-transform': 'translateX(-220px)',
      transform: 'translateX(-220px)'
    })
  }
  $($hamburgerButton).on('click touch', function() {
    if (mobileMenuIsVisible) {
      hideMenu()
    } else {
      showMenu()
    }
  })
  $(items).on('click touch', function(){
    if ($hamburgerButton.is(':visible')) {
      hideMenu()
    }
  })

})