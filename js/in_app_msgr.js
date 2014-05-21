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
          Plivo.conn.hangup()
          $('.messenger-shown').remove()
          clearInterval(interval)
          totalSeconds = 0
        },
      }, 
    }
  });
  $('.messenger-message-inner').append('<div id="status_txt">Connecting...</div>')

  $('#status_txt').css({
    'margin-top': '5px',
    'background-color': 'salmon',
    'padding': '3px',
    'border-radius': '5px',
    'font-weight': 'bold',
    'color': 'white',
    'width': '150px',
  })

  
  // make hang up button work 
  // - submit call duration to the update crm method
  // - add user img
}

