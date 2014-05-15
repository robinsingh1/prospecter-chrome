$('#signup_btn').on('click', function(){
  create_user()
});

Parse.initialize("KeExZClpOToLB2sqsM5NCqLHxD2Ixwayc8PIBQlM", "LDKhiQkBLClfElFsqyilJtSjljSuVgKhNRRaKX3F");
function create_user(){
  var user = new Parse.User();

  user.set("username", "lollol");
  user.set("email", "email@example.com");
  user.set("phone", "415-392-0202");
  user.set("password", "my pass");
   
  // -- Parse string from form -- 
  // '905-616-7602'.replace(/\D/g,'');
  
  user.signUp(null, {
    success: function(user) {
      console.log('success')
      window.location.href = "crm_choices.html"
    },
    error: function(user, error) {
      alert("Error: " + error.code + " " + error.message);
    }
  });
}
