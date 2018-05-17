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

  socket.on('new message', function (msg) {
    if (msg) {
      var message = `<li><div class="msg"><p>${msg}</p></div></li>`;
      $('ul.chat').append($('<li>').html(message));
      $('html,body').animate({scrollTop: $(document).height()})
    }
  });
});