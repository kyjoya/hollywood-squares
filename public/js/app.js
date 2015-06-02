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
    snap: '#photos',
    revert: true
  });
}

function dropit(i) {
  $('#answer'+i+'').droppable( {
    drop: handleDropEvent
  });
}

function handleCardDrop( event, ui ) {
  var slotMember = $(this).data( 'member' );
  var cardMember = ui.draggable.data( 'member' );

  if (slotMember == cardMember) {
    debugger;
    ui.draggable.addClass('correct');
    ui.draggable.draggable( 'disable' );
    $(this).droppable( 'disable' );
    ui.draggable.position( { of: $(this), my: 'left top', at: 'left top' } );
    ui.draggable.draggable( 'option', 'revert', false );
    correct++;

    if ( correct == 9 ) {
      $('#successMessage').show();
      $('#successMessage').animate( {
        left: '380px',
        top: '200px',
        width: '400px',
        height: '100px',
        opacity: 1
      });
    }
  }
}

var correct = 0

$(function () {
  $('#successMessage').hide();
});

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
          $('<div class="square"><div class="photos" id="tile_'+i+'"><img height="160px" width="200px" src=' + data["photos"][i] + '></div><div height="40px" width="180px" class="answer" id="answer'+i+'"></div></div>').data('member', i).appendTo('.squares').droppable( {
              accept: '.cast div',
              hoverClass: 'hovered',
              drop: handleCardDrop
            });
        };
        for(var i = 0; i < data["cast"].length; i++) {
          var $castDiv = [];
          // $castDiv.push('<div id="cast_'+i+'">' + data["cast"][i] + '</div>')
          $('<div class="cast" id="cast_'+i+'">' + data["cast"][i] + '</div>').data('member', i).appendTo('#cast').draggable( {
            containment: '#game',
            stack: '.cast div',
            cursor: 'move',
            revert: true
          });
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
