$('#signup_btn').on('click', function(){
  create_user()
});

function stuff(user){
  Parse.Cloud.run("send_phone_number_confirmation_email", {'email':user.get('email'),'id':user.id})
  Parse.Cloud.run("send_phone_number_confirmation_text", {'phone': user.get('phone')})
  Parse.Cloud.run("create_plivo_application", {'email':user.get('email'), 'phone':user.get('phone'), 'id': user.id})
}

Parse.initialize("KeExZClpOToLB2sqsM5NCqLHxD2Ixwayc8PIBQlM", "LDKhiQkBLClfElFsqyilJtSjljSuVgKhNRRaKX3F");

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
      console.log(user)
      stuff(user)
      //window.location.href = "crm_choices.html"
    },
    error: function(user, error) {
      alert("Error: " + error.code + " " + error.message);
    }
  });
}
