//TODO
// - debug Pipedrive integration
// - add verification screens

console.log('lmao')
// Add leadchimp btn to page

var btn = document.createElement("BUTTON")
var t = document.createTextNode("CLICK ME");
btn.appendChild(t);
jQuery(document).ready(function(){
  setTimeout( function(){
      jQuery('.g').each(function(index, value){
      jQuery(value).prepend('<a class="prospector">ADD TO PROSPECTOR</a>')
      console.log(jQuery.type(value))
    })
  }, 1000)
});

// Save prospect
$('.prospector').click(function(){
  console.log('added prospect')
});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ? "from a content script:" + sender.tab.url :
                                            "from the extension");
    console.log(request.un)
});

function add_leadchimp_btn_to_page(){

}

function save_prospect(){

}



