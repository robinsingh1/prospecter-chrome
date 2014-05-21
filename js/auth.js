// If User is signed in redirect to 
// choose pipeline

// Check for auth
Parse.initialize("KeExZClpOToLB2sqsM5NCqLHxD2Ixwayc8PIBQlM", "LDKhiQkBLClfElFsqyilJtSjljSuVgKhNRRaKX3F");
//Parse.User.logOut()

var currentUser = Parse.User.current();
console.log(Parse.User.current())
if (currentUser) {
  // if phoneVerified ? true : false
  // if emailVerified ? true : false
  // if valid_crm_auth_token ? true : false
  
  User = Parse.Object.extend('User');
  query = new Parse.Query(User)
  query.get(currentUser.id, {
    success: function(user) {
      unm = user.get('plivoLogin')
      pwd = user.get('plivoPassword')
      send_message(unm, pwd)
      window.location.href = "crm_choices.html"
    },
    error: function(object,error){
    }
  });
} else {
  window.location.href ="signup.html"
}
function send_message(unm, pwd){
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {un:unm,pw:pwd} , function(response) {
      console.log(response);
    });
  });
}


