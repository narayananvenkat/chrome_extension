function authenticate(){
  var signin_email = document.getElementById('username').value;

  var domainname = document.getElementById('domain_name').value;
  var signin_password = document.getElementById('password').value;

  var URL = "https://"+domainname+".freshsales.io/api/sign_in";

  var response = $.ajax
  ({
    type: "POST",
    url: URL,
    dataType: 'json',
    contentType: 'application/json',
    async: false,
    data: '{"user":{"email":"' + signin_email + '","password":"' + signin_password + '"}}',
  });
  if(response["responseJSON"]["login"]=="success"){
      document.getElementById('authentication').style.display = "none";
      document.getElementById('options').style.display = "none";
      document.getElementById('after_login').style.display = "block";
      chrome.storage.sync.set({"flag":"1"});
      chrome.storage.sync.set({"owner_email":signin_email, "owner_password":signin_password, "owner_domain":domainname });
  }
}

function displaySignin(){
  document.getElementById('authentication').style.display = "block";
}

document.getElementById('signin').addEventListener('click',authenticate);

document.getElementById('signin_page').addEventListener('click',displaySignin);
