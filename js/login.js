$('#login_btn').on('click', function(){
  authenticate_user()
});

Parse.initialize("KeExZClpOToLB2sqsM5NCqLHxD2Ixwayc8PIBQlM", "LDKhiQkBLClfElFsqyilJtSjljSuVgKhNRRaKX3F");

function authenticate_user(){
  email = $.trim($('#email').val())
  password = $.trim($('#password').val())
  Parse.User.logIn(email, password, {
    success: function(user) {
      window.location.href = 'ready.html'
    },
    error: function(user, error) {
      $('.login-alert').show()
    }
  });

}
