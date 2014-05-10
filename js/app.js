console.log('lol')

Plivo.onWebrtcNotSupported = webrtcNotSupportedAlert;
Plivo.onReady = onReady;
Plivo.onLogin = onLogin;
Plivo.onLoginFailed = onLoginFailed;
Plivo.onLogout = onLogout;
Plivo.onCalling = onCalling;
Plivo.onCallRemoteRinging = onCallRemoteRinging;
Plivo.onCallAnswered = onCallAnswered;
Plivo.onCallTerminated = onCallTerminated;
Plivo.onCallFailed = onCallFailed;
Plivo.onMediaPermission = onMediaPermission;
Plivo.onIncomingCall = onIncomingCall;
Plivo.onIncomingCallCanceled = onIncomingCallCanceled;
Plivo.init();

navigator.webkitGetUserMedia({audio: true}, function(_stream) { });
Plivo.conn.login('robin140507184306', 'lmaolmao');

function call(){
  console.log('call')
  Plivo.conn.call('+19056167602');
}

Plivo.onLogin = call

