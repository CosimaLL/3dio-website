$(function(){

  // fade in menu shadow on scroll
  var $doc = $(document)
  var $menuTopShadow = $('#menu-top-shadow')
  $(document).scroll(function() {
    if ($doc.scrollTop() > 50) {
      $menuTopShadow.css({ opacity: 1 })
    } else {
      $menuTopShadow.css({ opacity: 0 })
    }
  })

})