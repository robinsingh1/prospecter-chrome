// If User is signed in redirect to 
// choose pipeline

// Check for auth
Parse.initialize("KeExZClpOToLB2sqsM5NCqLHxD2Ixwayc8PIBQlM", "LDKhiQkBLClfElFsqyilJtSjljSuVgKhNRRaKX3F");
//Parse.User.logOut()

var currentUser = Parse.User.current();

if (currentUser) {
  // if phoneVerified ? true : false
  // if emailVerified ? true : false
  // if valid_crm_auth_token ? true : false
  
  //Plivo.conn.login(plivo.get('plivoLogin'), 'lmaolmao');
  window.location.href = "crm_choices.html"
} else {
  window.location.href ="signup.html"
}
