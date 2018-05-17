$(function () {
  var socket = io();

  $('input.textarea').on('keypress', function (e) {
    if (e.keyCode == 13 && $('input.textarea') !== null) {
      $('form').submit(function () {
        var text = $('#message').val();
        socket.emit('send message', text.trim());
        $('#message').val('');
        return false;
      });
    }
  });

  socket.on('new message', function (data) {
    console.log(data);
    if (data) {
      if (data['from'] == 'server') { var className = 'other'} else { var className = 'self';}
      var message = `<li class="${className}"><div class="msg"><p>${data['mensaje']}</p></div></li>`;
      $('ul.chat').append(message);
      $('html,body').animate({scrollTop: $(document).height()})
    }
  });
});