/* Zoominfo JS */

function get_zoominfo_prospects() {
  prospects = $('td.name')
  descriptions = $('td.description')
  the_prospects = []
  for(i=0;i<prospects.length;i++) {
    revenue = $(prospects[i]).find('.revenueText').text()
    revenue = (revenue == "") ? '&nbsp;' : revenue
    headcount = $(prospects[i]).find('.employeeCount').text()
    phone_number = $(prospects[i]).find('').text()
    website = $(prospects[i]).find('a[rel="NOFOLLOW"]').text()
    description = $(descriptions[i]).text()
    
    // add website, phone number, number of employees
    the_prospects.push([
      '<div class="prospect-company">',
        '<button class="add-prospect-btn">Add</button>',
        '<p class="company-name">'+jQuery(prospects[i]).find('.companyResultsName').text()+'</p>',
        '<p class="headcount" style="display:none;">'+headcount+'</p>',
        '<p class="phone_number" style="display:none;">'+phone_number+'</p>',
        '<p class="website" style="display:none;">'+website+'</p>',
        '<p class="description" style="display:none;">'+description+'</p>',
        '<p class="revenue">'+revenue+'</p></div>'].join(''))
  }
  return the_prospects
}

function add_prospecter_to_zoominfo() {
  prospects = get_zoominfo_prospects()

  $('body').append([ 
      '<div class="zoominfo_prospects">',
      '<div class="title-container">',
      '<button style="display:block;float:right;margin-top:15px">Add All & Next</button>',
      '<h1 class="title" style="font-weight:100;font-family:Helvetica">Customero</h1></div>', 
      '<div class="prospect-container">'+prospects.join('')+'</div>',
      '</div>' 
      ].join(''))
  
  $('.add-prospect-btn').on('click',function(e) {
    $(e.target).attr('disabled','')
    $(e.target).text('Added!')
    prospect = $(e.target).parent()

    data = {
    'name'        : prospect.find('.company-name').text(),
    'headcount'   : prospect.find('.headcount').text(),
    'phone_number': prospect.find('.phone_number').text(),
    'website'     : prospect.find('.website').text(),
    'description' : prospect.find('.description').text().trim(),
    'revenue'     : prospect.find('.revenue').text(),
    'company'     : {'__type':'Pointer',
                     'className':'Company',
                     'objectId':'fqHWp5NsFx'},
    }

    persist_prospect('Company', data)
  });
}
