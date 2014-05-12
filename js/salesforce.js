console.log('lol')

var totalSeconds = 0;

function setTime() {
  ++totalSeconds;
  $('#seconds').html(pad(totalSeconds%60));
  $('#minutes').html(pad(parseInt(totalSeconds/60)));
}

function pad(val) {
  var valString = val + "";
  if(valString.length < 2)
    return "0" + valString;
  else
    return valString;
}

function messenger(name, num){
Messenger.options = {
  extraClasses: 'messenger-fixed messenger-on-top messenger-on-right',
  theme: 'ice'
}

  msg = Messenger().post({
    message: "Calling "+name+" at "+num+".",
    id: "Only-one-message",
    hideAfter:10000,
    actions: { 
      retry: { 
        label: 'hang up', 
        action: function(){
          $('.messenger-shown').remove()
          clearInterval(interval)
          totalSeconds = 0
        },
      }, 
    }
  });
  $('.messenger-message-inner').append('<br/><label id="minutes">00</label>:<label id="seconds">00</label>')
  interval = setInterval(setTime, 1000);
  // make hang up button work 
  // - hang up phone call
  // - remove messenger from dom
  // - submit call duration to the update crm method
  // add user img
}


function call(e, name){
  raw_num = $(e.target).text()
  num = raw_num.replace(/[^\d.]/g, "")
  num = '+1'+num
  //Plivo.conn.call(num);

  name = $($(e.target).parents('tr').find('td')[0]).text()
  name = $($(e.target).parents('tr')[0]).find('th').text()

  messenger(name, raw_num)

  user_id = $($(e.target).parents('tr').find('td')[0]).find('a').attr('href')
  user_id = parseInt(user_id.split('/person/details/')[1])
  //updateCRM(name, user_id)
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
}

/*
var jq = document.createElement('script'); jq.src = "https://code.jquery.com/jquery-2.1.1.js"; document.getElementsByTagName('head')[0].appendChild(jq);
*/
