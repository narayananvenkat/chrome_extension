function authenticate(){
  // var signin_email = document.getElementById('username').value;
  //
  // var domainname = document.getElementById('domain_name').value;
  // var signin_password = document.getElementById('password').value;
  //
  // var URL = "https://"+domainname+".freshsales.io/api/sign_in";
  //
  // var response = $.ajax
  // ({
  //   type: "POST",
  //   url: URL,
  //   dataType: 'json',
  //   contentType: 'application/json',
  //   async: false,
  //   data: '{"user":{"email":"' + signin_email + '","password":"' + signin_password + '"}}',
  // });
  // if(response["responseJSON"]["login"]=="success"){
  //     chrome.runtime.sendMessage({message : "current_email"});
  //
  //     chrome.storage.sync.get("current_email",function(val){
  //       alert(val.current_email);
  //       var email = val.current_email;
  //       chrome.storage.sync.set({email : {"owner_email":signin_email, "owner_password":signin_password, "owner_domain":domainname }});
  //     });
  //     document.getElementById('authentication').style.display = "none";
  //     document.getElementById('options').style.display = "none";
  //     document.getElementById('after_login').style.display = "block";

  function registerCallback(registrationId) {
  if (chrome.runtime.lastError) {
    // When the registration fails, handle the error and retry the
    // registration later.
    return;
  }
  console.log(registrationId);
  // Send the registration token to your application server.
  sendRegistrationId(registrationId,function(succeed) {
    // Once the registration token is received by your server,
    // set the flag such that register will not be invoked
    // next time when the app starts up.

    if (succeed){
      chrome.storage.local.set({registered: true});
      chrome.storage.local.get("registered",function(val){
        console.log(val.registered);
      });
    }
    else{
      console.log("unsuccess");
    }
  });
}

function sendRegistrationId(registrationId,callback) {
  // Send the registration token to your application server
  // in a secure way.
    
}


  chrome.storage.local.get("registered", function(result) {
    // If already registered, bail out.
    if (result["registered"]){
      console.log("already registered");
      return;
    }

      console.log(result.registered);
      console.log("register starting...");
    // Up to 100 senders are allowed.
    var senderIds = ["1037846331393"];
    chrome.gcm.register(senderIds, registerCallback);
  });


}

function displaySignin(){

  document.getElementById('authentication').style.display = "block";
}

document.getElementById('signin').addEventListener('click',authenticate);

document.getElementById('signin_page').addEventListener('click',displaySignin);
