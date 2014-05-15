$('#login_button').on('click', function(){
  pipedrive_login()
});

Parse.initialize("KeExZClpOToLB2sqsM5NCqLHxD2Ixwayc8PIBQlM", "LDKhiQkBLClfElFsqyilJtSjljSuVgKhNRRaKX3F");
user = Parse.User.current()

function pipedrive_login(){
  login_info = {'email':'robin@customerohq.com', 'password':'951562nileppez'}
  //login_info = {'email':$('#email').val() , 'password':$('#password').val()}

  $.post('http://api.pipedrive.com/v1/authorizations', login_info).done(function(data){
    console.log(data)
    api_token = data.data[0].api_token
    user.set('crm_auth_token', api_token)
    user.save()
    window.location.href = "ready.html"
  });
}

/*
 * TODO
 * - routing with backbone
 * - phone confirmation
 * - email verification
 * - Posting to pipedrive /crm  from parse cloudcloud
 * - salesforce oauth from chrome web extension
*/
