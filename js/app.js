//TODO
// make searches only load in our google searches
// store completed requests in localstorage

console.log('lmao')
console.log('lol')

// Initialize Prospect Window
//
function signin_user() {
  $('body').append([ 
      '<div class="zoominfo_prospects" style="height:300px">',
      '<div class="title-container">',
      '<h1 class="widget-title" style="padding-bottom:13px;">Customero</h1></div><br/>', 
      '<div class="signin-block">',
      '<input id="email" type="text" placeholder="Enter Email ..." class="signin-form"/><br/>',
      '<input id="password" type="password" placeholder="Enter Password ..." class="signin-form"/><br/>',
      '<button class="signin-btn">Sign In</button>',
      '</div>',
      '</div>' 
      ].join(''))

  $('.signin-btn').on('click', function() {
    email    = $('#email').val()
    password = $('#password').val()

    parse_headers = {
      "X-Parse-Application-Id": "N85QOkteEEQkuZVJKAvt8MVes0sjG6qNpEGqQFVJ", 
      "X-Parse-REST-API-Key": "VN6EwVyBZwO1uphsBPsau8t7JQRp00UM3KYsiiQb"
    }

    $.ajax({
      url: 'https://api.parse.com/1/login',
      data: {'username':email,
             'password':password},
      headers: parse_headers,
      success: function(res) {
        console.log(res)
        // save user in localStorage
        // redirect to prospecter
        localStorage.currentUser = JSON.stringify(res)
        $('.zoominfo_prospects').remove()
        //add_prospecter_to_linkedin()
        if(document.URL.indexOf('vsearch') != -1)
          add_prospecter_to_linkedin()
        else if(document.URL.indexOf('profile') != -1)
          add_profile_prospecter_to_linkedin()
      },
      error: function(err) {
        console.log('error')
      }
    })
  });
}

function localUser(res) {

}

jQuery(document).ready(function(){
  currentUser = localStorage.currentUser

  setTimeout( function(add_prospect){
    if(document.URL.indexOf('google') != -1) {
      //add_prospects_btns_to_google_search_results()
      //persist_google_prospect()
    } else if(document.URL.indexOf('linkedin') != -1) {
      if(typeof(currentUser) == "undefined") {
        signin_user()
      } else {
        if(document.URL.indexOf('vsearch') != -1)
          add_prospecter_to_linkedin()
        else if(document.URL.indexOf('profile') != -1)
          add_profile_prospecter_to_linkedin()
        else if(document.URL.indexOf('company') != -1)
          add_company_profile_prospecter_to_linkedin()
      }
    } else if (document.URL.indexOf('zoominfo') != -1) {
      //add_prospecter_to_zoominfo()
    }
  }, 2000)
});

/* TODO - What does this do ?
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ? "from a content script:" + sender.tab.url :
                                            "from the extension");
    console.log(request.un)
});
*/
