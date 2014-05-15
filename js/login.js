$('#login_button').on('click', function() {
  hellYeah('xxx');
});

function pipedrive_login(){
  console.log('sent request')
  login_info = {'email':$('#email').val() , 'password':$('#password').val()}

  /*
  {'email':'robin@customerohq.com',
   'password':'951562nileppez'})
  */

  $.post('http://api.pipedrive.com/v1/authorizations', login_info)
        .done(function(data){
          console.log(data)
          api_token = data.data[0].api_token
        });

  console.log(api_token)
}
