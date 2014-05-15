// If User is signed in redirect to 
// choose pipeline

// Check for auth
Parse.initialize("KeExZClpOToLB2sqsM5NCqLHxD2Ixwayc8PIBQlM", "LDKhiQkBLClfElFsqyilJtSjljSuVgKhNRRaKX3F");

var currentUser = Parse.User.current();
if (currentUser) {
  window.location.href = "crm_choices.html"
} else {
  window.location.href ="signup.html"
}
