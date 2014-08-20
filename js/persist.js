// TODO 
// - Split Into Two Functions
//   - I guess the thinking is that they would be very similar
// - Initial Info Save To Parse
// - Add Queue In API
// - Update Parse Object With New stuff from linkedin API

function persist_prospect(prospectType, data) {
  //console.log(data)
  parse_headers = {
    "X-Parse-Application-Id":"N85QOkteEEQkuZVJKAvt8MVes0sjG6qNpEGqQFVJ",
    "X-Parse-REST-API-Key": "VN6EwVyBZwO1uphsBPsau8t7JQRp00UM3KYsiiQb",
    "Content-Type": "application/json",
  }

  the_data = { 'company_name'  : data.company_name, 
               'description'   : data.pos,
               'name'          : data.name          }

  parseEndpoint = (prospectType == 'Company') ? 'CompanyProspect' : 'Prospects'
  apiEndpoint =  (prospectType == 'Company') ? 'get_company_info' : 'get_company_website_from_name' 

  if(data.company_name == "undefined"){
    data.company_name = ""
    apiEndpoint = 'find_company'
    the_data = {'description'   : data.pos,
                'name'          : data.name }
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
      console.log(prospectData.objectId + " " + prospectData.case)
      
      $.ajax({
        //url: 'https://agile-plains-2430.herokuapp.com/linkedin_info_request',
        url: 'http://127.0.0.1:5000/linkedin_info_request',
        type:'GET',
        data: prospectData,
        success: function(res) {
          //console.log('success')
          //console.log(res)
        },
        error: function(err) {
          console.log('error')
          console.log(err)
        }
      })
    },
    error: function(err) {
      console.log(err)
    }
  });
}
