
function add_prospects_btns_to_google_search_results(){
  jQuery('.g').each(function(index, value){
    jQuery(value).prepend('<a class="prospector">ADD TO PROSPECTOR</a>')
    console.log(jQuery.type(value))
  })
}

function persist_google_prospect() {
  $('.prospector').click(function(e){
    public_url = 'http://'+$($(e.target).parents()[0]).find('.s').find('cite').text()
    console.log($($(e.target).parents()[0]).find('.s'))
    console.log(public_url)
    $(e.target).removeClass('prospector')
    $(e.target).addClass('added-prospect')

    //public_url = "http://www.linkedin.com/in/markroberge"
    $.ajax({
      url:'http://0.0.0.0:5000/save_prospect',
      type:"POST",
      data: JSON.stringify({'public_url':public_url}),
      //data: {'public_url':'public_url'},
      contentType:"application/json; charset=utf-8",
      dataType:"json",
      success: function(data){
        console.log(data)
      }
    })
  });
}
