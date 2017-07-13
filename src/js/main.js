$(function(){

  // fade in menu shadow on scroll
  var $doc = $(document)
  var $menuTopShadow = $('#menu-top-shadow')
  var $hamburgerButton = $('#hamburger-button')
  var $items = $('#items')
  var $titleRow = $('#title-row')
  var $titlePic = $('#title-pic')
  var $titlePicPlan = $('#title-pic-plan')
  var $titlePicArch = $('#title-pic-arch')
  var $titlePicFurniture = $('#title-pic-furniture')

  /*
   * Desktop Menu
   */

  var current = 1, target = 0

  $(document).scroll(function() {
    var scrollTop = $doc.scrollTop()

    // title pic animation
    var titleRowHeight = $titleRow.height()
    // at which scroll position in px to start and stop the animation:
    var animStart = 50
    var animEnd = titleRowHeight*0.7
    // calculate target positon
    target = Math.min(1, Math.max(0, scrollTop-animStart) / animEnd)

    // shadow
    if ($menuTopShadow.is(':visible')) {
      if (scrollTop > 50) {
        $menuTopShadow.css({ opacity: 1 })
      } else {
        $menuTopShadow.css({ opacity: 0 })
      }
    }

  })

  onAnimationFrame(function(){
    // lerp towards scroll target
    current = Math.round((current + (target-current)*0.035)*10000)/10000
    // update pic css
    $titlePic.css({
      opacity: 1-current
    })
    $titlePicFurniture.css({
      '-webkit-transform': 'translateY('+(-0 + current * -55)+'%)',
      transform: 'translateY('+(-0 + current * -55)+'%)'
    })
    $titlePicArch.css({
      '-webkit-transform': 'translateY('+(30 + current * -8)+'%)',
      transform: 'translateY('+(30 + current * -8)+'%)'
    })
    $titlePicPlan.css({
      '-webkit-transform': 'translateY('+(90 + current * 30)+'%)',
      transform: 'translateY('+(90 + current * 30)+'%)'
    })
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


// animation frame

requestAnimationFrame = window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  function ( callback, element) {
    return window.setTimeout(callback, 1000 / 60);
  }

cancelRequestAnimationFrame =  window.webkitCancelRequestAnimationFrame ||
  window.mozCancelRequestAnimationFrame ||
  window.oCancelRequestAnimationFrame ||
  window.msCancelRequestAnimationFrame ||
  clearTimeout

var animationFrameCallbacks = []
function onAnimationFrame (callback) {
  animationFrameCallbacks.push(callback)
}

;(function loopFrameRequest () {
  for (var i=0; i<animationFrameCallbacks.length; i++) animationFrameCallbacks[i]()
  requestAnimationFrame(loopFrameRequest)
})()