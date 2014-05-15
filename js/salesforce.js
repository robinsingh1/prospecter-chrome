console.log('lol')

/*
 * - Custom Caller ID
 * - fix bug with multiple clicks
 * - make finding the phone number more generic eg find name of column
 * - make finding the name of person more generic
 * - refactor CRM specific steps
 * - add fullcontact social profile popups
*/

function call(e, name){
  raw_num = $(e.target).text()
  num = raw_num.replace(/[^\d.]/g, "")
  num = '+1'+num
  Plivo.conn.call(num);

  // Will be different for each CRM
  name = $($(e.target).parents('tr').find('td')[0]).text()
  name = $($(e.target).parents('tr')[0]).find('th').text()

  messenger(name, raw_num)

  user_id = $($(e.target).parents('tr').find('td')[0]).find('a').attr('href')
  user_id = parseInt(user_id.split('/person/details/')[1])
  //updateCRM(name, user_id)
}

function callAnswered(){
  console.log('call answered')
  $('#status_txt').html('<div id="timer"><label id="minutes">00</label>:<label id="seconds">00</label></div>')
  interval = setInterval(setTime, 1000);
}

function callTerminated(){
  $('#timer').remove()
  $('#status_txt').text('Call Was Terminated.')
  clearInterval(interval)
}

function callFailed(){

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

// Salesforce
phone_numbers = $('body').find('.dataCell.PhoneNumberElement')
for(i=0;i<phone_numbers.length;i++){
  num = $(phone_numbers[i]).text()
  $(phone_numbers[i]).html('<a href="#">'+num+'</a>')
  $(phone_numbers[i]).find('a').css('color','#44ca00')
  $(phone_numbers[i]).find('a').click(call)
  $(phone_numbers[i]).find('a').addClass("popover")
  //$(phone_numbers[i]).find('a').attr("rel","tooltip")
  //$(phone_numbers[i]).find('a').attr("title","tooltip")
}

/*
var jq = document.createElement('script'); jq.src = "https://code.jquery.com/jquery-2.1.1.js"; document.getElementsByTagName('head')[0].appendChild(jq);
*/
