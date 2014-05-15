
Parse.initialize("KeExZClpOToLB2sqsM5NCqLHxD2Ixwayc8PIBQlM", "LDKhiQkBLClfElFsqyilJtSjljSuVgKhNRRaKX3F");
$('#logout_button').on('click', function(){
  logout()
});

function logout(){
  Parse.User.logOut();
  window.location.href="signup.html"
}
