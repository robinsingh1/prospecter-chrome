/*
 * TODO
 * - If "Current:" is present use that to Get Prospects title
 * - Fix Add Company Prospect To Parse
 * - Fix Add Profile Prospect To Parse
 * - Add Prospect Similar Profiles
 * - Add Prospect Also Viewed when Viewing someones Profile
 * - Remove Add All & Next Buttonfor no profiles found
 * - Add UI for prospects that have been prospected
 * - Add UI for Add All & Next for add buttons
 * - Add Added Prospects to Extension LocalStorage 
 * - Make Chrome Web Store profile look nice
 *
 * - Not In MVP
 * - Add Accelerate!
*/

function strip_data_from_html(prospect, prospectType) {
  prospect = $(prospect)
  if(prospectType == "Company"){
    data = {
      'name'        : prospect.find('.li-company-name').text(),
      'headcount'   : prospect.find('.headcount').text(),
      'profile'     : prospect.find('.profile').text(),
      'industry'    : prospect.find('.industry').text(),
      'company'     : JSON.parse(localStorage.currentUser).company
    }
  } else {
    //console.log('strip data')
    data = {
      'name'        : prospect.find('.li-company-name').text(),
      'pos'         : prospect.find('.title').text(),
      'company_name': prospect.find('.company_name').text(),
      'linkedin_url': prospect.find('.profile').text(),
      'industry'    : prospect.find('.industry').text(),
      'city'        : prospect.find('.city').text(),
      'user'        : {'__type':'Pointer', 'className':'User', 
                       'objectId':JSON.parse(localStorage.currentUser).objectId },
      'company'     : JSON.parse(localStorage.currentUser).company
    }
  }
  console.log(data)
  persist_prospect(prospectType, data)
}

function add_prospecter_to_linkedin() {
  prospects = get_linkedin_prospects()

  $('body').append([ 
      '<div class="zoominfo_prospects" style="">',
      '<div class="title-container">',
      '<button id="add_all_btn" style="display:block;float:right;margin-top:15px">Add All & Next</button>',
      '<h1 class="widget-title" style="">Customero</h1></div>', 
      '<div class="prospect-container" style="width:100%">'+prospects.join('')+'</div>',
      '</div>' 
  ].join(''))

  $('#add_all_btn').on('click', function(e) {
    the_prospects = $('.prospect-container').find('div')
    for(i=0;i < the_prospects.length;i++) {
      prospectType = $(the_prospects[i]).find('.prospect-type').text()
      strip_data_from_html(the_prospects[i], prospectType)
      if(i > 10) break;
    }

    // Go To Next Page
    $('body').find('a[rel=next]')[0].click()
    overlayHidden = false
    lol = setInterval(function() {
      height = $('#voltron-overlay').height()

      if(height)
        overlayHidden = true

      if(overlayHidden && height == 0){
        prospects = get_linkedin_prospects()
        $('.prospect-container').html(prospects.join(''))
        clearInterval(lol)
      }
    }, 200)

    /*
    setTimeout( function() {
      prospects = get_linkedin_prospects()
      $('.prospect-container').html(prospects.join(''))
      //add_click_listener()
    }, 5000)
    */
  })
  // Click Action
  add_click_listener()
}


function add_click_listener() {
  $('.add-prospect-btn').on('click',function(e) {
    //console.log('ADD')
    $(e.target).attr('disabled','')
    $(e.target).text('Added!')
    prospect = $(e.target).parent()
    prospectType = $(prospect).find('.prospect-type').text()
    strip_data_from_html(prospect, prospectType)
  });
}

function get_linkedin_prospects() {
  // Get Prospects From Linkedin Profile Feed
  people_prospects = $('li.result.people')
  company_prospects = $('li.result.company')

  console.log(people_prospects.length)
  console.log(company_prospects.length)

  if(people_prospects.length == 0 && company_prospects.length == 0){
    return ['<div id="no-prospects-found">No Company or People prospects found.</div>'] 
  }else if(people_prospects.length == 0)
    prospects = company_prospects
  else if(company_prospects.length == 0)
    prospects = people_prospects
  else
    prospects = people_prospects.concat(company_prospects)

  the_prospects = []
  if($(prospects[0]).hasClass('company')){
    
    for(i=0;i< prospects.length;i++){
      img = $(prospects[i]).find('img').attr('src')
      name = $($(prospects[i]).find('a.title')[0]).text()
      profile = $(prospects[i]).find('h3').find('a').attr('href')
      industry = $(prospects[i]).find('p.description').text()
      headcount = $($(prospects[i]).find('dd')[1]).text()
      prospect_type = ($(prospects[i]).hasClass('people')) ? 'Person' : 'Company'
      
      //industry = (industry == "") ? '&nbsp;' : industry

      the_prospects.push([
        '<div class="li-prospect-company">',
          '<style>',
          ' .industry{', 
          ' width: 185px !important;',
          ' white-space: nowrap;',
          ' overflow: hidden;',
          ' text-overflow: ellipsis;}',
          '</style>',
          '<button class="add-prospect-btn">Add</button>',
          '<img class="li-img" src="'+img+'" />',
          '<p class="li-company-name">'+name+'</p>',
          '<p class="prospect-type" style="display:none;">'+prospect_type+'</p>',
          '<p class="headcount" style="display:none;">'+headcount+'</p>',
          '<p class="profile" style="display:none;">'+'http://linkedin.com'+profile+'</p>',
          '<p class="industry">'+industry+'</p></div>'].join(''))
    }
  } else {
    for(i=0;i< prospects.length;i++){
      img = $(prospects[i]).find('img').attr('src')
      name = $($($(prospects[i]).find('h3')[0]).find('a')[0]).text()
      profile = $(prospects[i]).find('h3').find('a').attr('href')
      city = $($(prospects[i]).find('dd')[0]).text()

      // Get Title From "Current:" if visible
      //console.log($(prospects[i]).text().indexOf('Current'))
      if($(prospects[i]).text().indexOf('Current') != -1) {
        //console.log('Current is available')
        //console.log($(prospects[i]).find('p.title'))
        description = $($(prospects[i]).find('dl.snippet').find('dd')[0]).text()
        console.log(title.split(' at ')[1])
        title = description.split(' at ')[0]
        company_name = description.split(' at ')[1]
      } else{
        //console.log('Using description')
        title = $(prospects[i]).find('p.description').text().split(' at ')[0]
        company_name = $(prospects[i]).find('p.description').text().split(' at ')[1]
      }

      industry = $($(prospects[i]).find('dd')[1]).text()
      prospect_type = ($(prospects[i]).hasClass('people')) ? 'Person' : 'Company'
      industry = (industry == "") ? '&nbsp;' : industry

      the_prospects.push([
        '<div class="li-prospect-company">',
          '<button class="add-prospect-btn">Add</button>',
          '<img class="li-img" src="'+img+'" />',
          '<p class="li-company-name">'+name+'</p>',
          '<p class="prospect-type" style="display:none;">'+prospect_type+'</p>',
          '<p class="title" style="display:none;">'+title+'</p>',
          '<p class="city" style="display:none;">'+city+'</p>',
          '<p class="company_name" style="display:none;">'+company_name+'</p>',
          '<p class="profile" style="display:none;">'+profile+'</p>',
          '<p class="industry">'+industry+'</p></div>'].join(''))
    }
  }
  return the_prospects
}

function accelerate_linkedin() {
  //console.log('clicked')
  //
  $('#accelerate_linkedin').on('click',function() {
    $('li.next').find('a')[0].click()
    setTimeout( function(){
      $('div#results-pagination').append( '<br/><center><button id="accelerate_linkedin" class="btn btn-success" > Accelerate >> </button></center>')
    }, 3500)
  });
}

