console.log('lol')

function call(e, name){
  raw_num = $(e.target).text()
  num = $(e.target).text().replace(/[^\d.]/g, "")
  num = '+1'+num
  Plivo.conn.call(num);

  name = $($(e.target).parents('tr').find('td')[0]).text()

  messenger(name, raw_num)

  user_id = $($(e.target).parents('tr').find('td')[0]).find('a').attr('href')
  user_id = parseInt(user_id.split('/person/details/')[1])
  updateCRM(name, user_id)
}


function updateCRM(name,user_id){
  api_token = '?api_token=f7ecfd6be2d6a793b743893c2a4bc1648449625d'
  base_url = 'https://api.pipedrive.com/v1/activities'

  subject = 'Made a call to '+name
  due_date = moment().format('YYYY-MM-DD')
  due_time = moment.utc().format('HH:MM')
  duration = "10:10"

  data = {
    "subject"   : subject,
    "done"      : true,
    "type"      : "call",
    //"due_date"  : due_date,
    //"due_time"  : due_time,
    "duration"  : duration,
    "user_id"   : user_id,
  }

  $.post(base_url+api_token, data)
}

// Pipedrive Call To Links
callto_links = $('body').find('a[href^="callto:"]')
for(i=0;i<callto_links.length;i++){
  $(callto_links[i]).attr('href','#')
  $(callto_links[i]).click(call)
}

// Salesforce

