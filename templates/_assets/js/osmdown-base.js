//osmdown-base
//============
//Helper functions and formatters for all front end
//

var MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

//Lets add a scrolling header?
$(document).ready(function(){

  $('h1.title').click(function(){
    $('html, body').animate({
      scrollTop: 0
    }, 500);
  })

  var all_headings = $("h1");
  var scrolling_list = $("#scrolling_nav");

  all_headings.each(function(idx, heading){
    if (idx > 1){
      elem = all_headings[idx]
      var top = $(elem).offset().top
      var li = $('<li/>')
        .addClass('ui-menu-item')
        .addClass('scrolling-nav-item')
        .attr('role', 'menuitem')
        .addClass('ui-all')
        .html(elem.innerHTML)
        .click(function() {
          $('html, body').animate({
            scrollTop: top - 50
          }, 500);
        })
        .appendTo(scrolling_list)
    }

  })

});

//TODO: Make it highlight headings...
// $(document).scroll(function(data){
//   console.log(data)
// })
