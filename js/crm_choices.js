Parse.initialize("KeExZClpOToLB2sqsM5NCqLHxD2Ixwayc8PIBQlM", "LDKhiQkBLClfElFsqyilJtSjljSuVgKhNRRaKX3F");
user = Parse.User.current()
//document.write(JSON.stringify(user))
crm_token = user.get('crm_auth_token')

if(typeof crm_token != 'undefined')
  window.location.href = "ready.html"
