function get_profile_prospect() {
  return []
}

function add_profile_prospecter_to_linkedin() {
  prospects = get_profile_prospect()
  prospects = ['<button class="add_prospect_profile" id="add_profile" style="display:block;margin-top:15px">Add '+$('.full-name').text()+' To Prospects</button>']

  $('body').append([ 
      '<div class="zoominfo_prospects" style="height:400px">',
      '<div class="title-container">',
      '<h1 class="widget-title" style="">Customero</h1></div>', 
      '<button class="add_all_and_next" id="add_profile" style="">',
      'Add All And Next</button>', 
      '<button class="add_ppl_also_viewed" id="add_profile" style="">',
      'Add People Also Viewed</button>', 
      '<button class="add_all_similar" id="add_profile" style="">',
      'Add All Similar</button>', 
      '<button class="open_all_also_viewed" id="add_profile" style="">Open All Also Viewed</button>', 
      '<button class="open_all_similar" id="add_profile" style="">Open All Similar</button>', 
      '<div class="prospect-container" style="width:100%">'+prospects.join(''), '</div></div>' 
      ].join(''))

  //$('#add_all_btn').hide()
  $('.zoominfo_prospects').css({height:'350px'})

  $('.add_prospect_profile').click(function() {
    console.log('add prospect profile')
    data = {
      'name':$('span.full-name').text(),
      'pos':$('p.title').text(),
      'industry':$('dd.industry').text(),
      'city':$('span.locality').text(),
      'loading' :true,
      'archived':true,
      'company' :JSON.parse(localStorage.currentUser).company,
      'linkedin_url':$('dl.public-profile').find('dd').text()
    }
    console.log(data.pos)
    if(data.pos.indexOf(' at ') != -1) {
      data.company_name = data.pos.split(' at ')[1]
      data.pos = data.pos.split(' at ')[0]
    }
    persist_prospect('Prospects', data)
  });

  $('.add_ppl_also_viewed').click(function() {
    alsoViewed = $('.insights-browse-map').find('li')
    for(i=0;i< alsoViewed.length; i++) {
      pos = $(alsoViewed[i]).find('.browse-map-title').text()
      name = $(alsoViewed[i]).find('h4').text()
      data = {
        'name':name,
        'pos':pos,
        'loading'     : true,
        'archived'    : true,
        'company'     : JSON.parse(localStorage.currentUser).company,
        'linkedin_url' : $(alsoViewed[i]).find('h4').find('a').attr('href')
      }
      if(pos.indexOf(' at ') != -1){
        data.pos = pos.split(' at ')[0]
        data.company_name = pos.split(' at ')[1]
      }
      //console.log(title + " ---- "+name)
      persist_prospect('Prospects', data)
    }
  });

  $('.add_all_similar').click(function() {
    //
    console.log('add all similar')
    details = $('.discovery-results').find('.discovery-detail')
    console.log(details)
    for(i=0;i< details.length; i++){
      name = $(details[i]).find('dt').find('a').text()
      pos = $(details[i]).find('dd').attr('title')
      data = {
        'name':name,
        'pos':pos,
        'loading'     : true,
        'archived'    : true,
        'company'     : JSON.parse(localStorage.currentUser).company,
        'linkedin_url': $(details[i]).find('dt').find('a').attr('href')
      }
      if(pos.indexOf(' at ') != -1){
        data.pos = pos.split(' at ')[0]
        data.company_name = pos.split(' at ')[1]
      }
      //console.log(title + " ---- "+name)
      persist_prospect('Prospects', data)
    }
  });

  $('.open_all_also_viewed').click(function() {
    //
    console.log('open all also viewed')
    links = $('.insights-browse-map').find('a.browse-map-photo')
    for(i=0;i< links.length; i++){
      //window.open($(links[i]).attr('href'))
      link = $(links[i]).attr('href')
      bg_open_link(link)
    }
  });

  $('.open_all_similar').click(function() {
    //
    console.log('open all similar')
    links = $('.discovery-results').find('a.discovery-photo')
    for(i=0;i< links.length; i++){
      link = $(links[i]).attr('href')
      bg_open_link(link)
    }
  });

  $('.add_all_and_next').click(function() {

    alsoViewed = $('.insights-browse-map').find('li')
    for(i=0;i< alsoViewed.length; i++) {
      pos = $(alsoViewed[i]).find('.browse-map-title').text()
      name = $(alsoViewed[i]).find('h4').text()
      data = {
        'name':name,
        'pos':pos,
        'loading'     : true,
        'archived'    : true,
        'company'     : JSON.parse(localStorage.currentUser).company,
        'linkedin_url' : $(alsoViewed[i]).find('h4').find('a').attr('href')
      }
      if(pos.indexOf(' at ') != -1){
        data.pos = pos.split(' at ')[0]
        data.company_name = pos.split(' at ')[1]
      }
      persist_prospect('Prospects', data)
    }

    details = $('.discovery-results').find('.discovery-detail')
    for(i=0;i< details.length; i++){
      name = $(details[i]).find('dt').find('a').text()
      pos = $(details[i]).find('dd').attr('title')
      data = {
        'name':name,
        'pos':pos,
        'loading'     : true,
        'archived'    : true,
        'company'     : JSON.parse(localStorage.currentUser).company,
        'linkedin_url': $(details[i]).find('dt').find('a').attr('href')
      }
      if(pos.indexOf(' at ') != -1){
        data.pos = pos.split(' at ')[0]
        data.company_name = pos.split(' at ')[1]
      }
      //console.log(title + " ---- "+name)
      persist_prospect('Prospects', data)
    }
    window.open($('a.recommendation-link').attr('href'))
  });
}

function bg_open_link(link) {
  var a = document.createElement("a");
  a.href = link
  var evt = document.createEvent("MouseEvents");
  //the tenth parameter of initMouseEvent sets ctrl key
  // For Mac This Works Check For - Windows
  evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0,
                              false, false, false, true, 0, null);
  a.dispatchEvent(evt);
}
