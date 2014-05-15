$('#signup_btn').on('click', function(){
  create_user()
});

Parse.initialize("KeExZClpOToLB2sqsM5NCqLHxD2Ixwayc8PIBQlM", "LDKhiQkBLClfElFsqyilJtSjljSuVgKhNRRaKX3F");

function send_conf_email(user){
  Parse.Cloud.run("send_phone_number_confirmation_email", user)
  Parse.Cloud.run("send_phone_number_confirmation_text", user)
}

function create_user(){
  var user = new Parse.User();

  user.set("username", $.trim($('#email').val()));
  user.set("email", $.trim($('#email').val()));
  user.set("phone", $.trim($('#phone').val().replace(/\D/g,'')));
  user.set("password", $.trim($('#password').val()));
  user.set("phoneVerified", false);
   
  user.signUp(null, {
    success: function(user) {
      console.log('success')
      // send phone confirmation email
      phone = $.trim($('#phone').val().replace(/\D/g,''))
      send_conf_email({"email": $.trim($('#email').val()),"phone":phone})   
      console.log(user)
      //window.location.href = "crm_choices.html"
    },
    error: function(user, error) {
      alert("Error: " + error.code + " " + error.message);
    }
  });
}
