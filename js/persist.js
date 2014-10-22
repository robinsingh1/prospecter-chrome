// TODO 

function persist_prospect(prospectType, data) {
  //console.log(data)
  parse_headers = {
    "X-Parse-Application-Id":"N85QOkteEEQkuZVJKAvt8MVes0sjG6qNpEGqQFVJ",
    "X-Parse-REST-API-Key": "VN6EwVyBZwO1uphsBPsau8t7JQRp00UM3KYsiiQb",
    "Content-Type": "application/json",
  }

  the_data = { 'company_name'  : data.company_name, 
               'description'   : data.pos,
               'pos'           : data.pos,
               'name'          : data.name          }

  parseEndpoint = (prospectType == 'Company') ? 'CompanyProspect' : 'Prospect'
  apiEndpoint =  (prospectType == 'Company') ? 'get_company_info' : 'get_company_website_from_name' 

  if(typeof(data.company_name) == "undefined" || data.company_name == ""){
    data.company_name = ""
    apiEndpoint = 'find_company'
    the_data = {'pos'   : data.pos,
                'company_name':data.company_name,
                'name'  : data.name }
  }

  the_data.case = apiEndpoint

  $.ajax({
    url: 'https://api.parse.com/1/classes/'+parseEndpoint,
    type: 'POST',
    headers: parse_headers,
    data: JSON.stringify(data),
    prospectData: the_data,
    success: function(res) {
      prospectData = this.prospectData
      prospectData.objectId = res.objectId
      
      /*
      $.ajax({
        //url: 'https://agile-plains-2430.herokuapp.com/linkedin_info_request',
        url: 'https://nameless-retreat-3525.herokuapp.com/linkedin_info_request',
        //url: 'http://127.0.0.1:5000/linkedin_info_request',
        type:'GET',
        data: prospectData,
        success: function(res) { //console.log(res) },
        error: function(err) { //console.log(err) }
      })
      */

      if(typeof(prospectData.company_name) == "undefined" || prospectData.company_name == ""){
        console.log("should be queued")
        $.ajax({
          //url: 'https://agile-plains-2430.herokuapp.com/linkedin_info_request',
          //url: 'https://nameless-retreat-3525.herokuapp.com/profile_detail',
          url: 'http://127.0.0.1:5000/profile_detail',
          type:'GET',
          data: prospectData,
          success: function(res) { console.log(res) },
          error: function(err) { console.log(err) }
        })
      } else {
        // Get Company Info
        console.log("should be queued")
        $.ajax({
          //url: 'https://agile-plains-2430.herokuapp.com/linkedin_info_request',
          //url: 'https://nameless-retreat-3525.herokuapp.com/profile_detail',
          //url: 'https://nameless-retreat-3525.herokuapp.com/chrome_company_info',
          url: 'http://127.0.0.1:5000/chrome_company_info',
          type:'GET',
          data: prospectData,
          success: function(res) { console.log(res) },
          error: function(err) { console.log(err) }
        })
      }
    },
    error: function(err) {
      console.log(err)
    }
  });
}
