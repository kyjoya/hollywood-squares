jQuery.browser = {};
(function () {
    jQuery.browser.msie = false;
    jQuery.browser.version = 0;
    if (navigator.userAgent.match(/MSIE ([0-9]+)\./)) {
        jQuery.browser.msie = true;
        jQuery.browser.version = RegExp.$1;
    }
})();

function init(i) {
  $('#cast_'+i+'').draggable( {
  containment: '#squares',
  cursor: 'pointer',
  snap: '#photos'
  });
}

function dropit(i) {
  $('#answer'+i+'').droppable( {
    drop: handleDropEvent
  });
}

function handleDropEvent( event, ui ) {
  var draggable = ui.draggable;
  alert( 'The square with ID "' + draggable.attr('id') + '" was dropped onto me!' );
}

$(function() {
  $("#movie_form").submit(function(event) {
    event.preventDefault();

    $('#game').addClass('squares')
    $('#movie_form').hide();


    $.ajax({
      url: "/movie.json",
      data: $(this).serialize(),
      dataType: "json",
      success: function(data) {
        for(var i = 0; i < data["photos"].length; i++) {
          $('.squares').append('<div id="square"><div class="photos" id="tile_'+i+'"><img height="180px" width="180px" src=' + data["photos"][i] + '></div><div height="30" width="180px" class="answer" id="answer'+i+'"></div></div>');
          $(dropit(i))
        };
        for(var i = 0; i < data["cast"].length; i++) {
          var $castDiv = [];
          // $castDiv.push('<div id="cast_'+i+'">' + data["cast"][i] + '</div>')
          $('#cast').append('<div id="cast_'+i+'">' + data["cast"][i] + '</div>')
          $(init(i));
        };
      }
    });
  });

});



// $(function() {
//   $('button#reset').on('click', function(){
//         $('#squares').removeClass('photos');
//     });
//   });
