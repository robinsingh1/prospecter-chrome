function get_profile_prospect() {
  return []
}

function add_profile_prospecter_to_linkedin() {
  prospects = get_profile_prospect()
  prospects = ['<button id="add_profile" style="display:block;margin-top:15px">Add '+$('.full-name').text()+' To Prospects</button>']

  $('body').append([ 
      '<div class="zoominfo_prospects" style="height:200px">',
      '<div class="title-container">',
      '<h1 class="widget-title" style="">Customero</h1></div>', 
      '<div class="prospect-container" style="width:100%">'+prospects.join(''),
      '</div></div>' 
      ].join(''))

  //$('#add_all_btn').hide()
  $('.zoominfo_prospects').css({height:'100px'})
}
