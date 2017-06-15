$(document).ready(function(){
//  alert('hello');
  chrome.storage.sync.get(["email","owner_email","owner_domain","owner_password"],function(val){
    //document.getElementById('user-mail-id').innerHTML = val.email;
    var URL = "https://" + val.owner_domain + ".freshsales.io/search.json?q=" + val.email + "&include=lead";
    var id = "hey";
    var search_response = $.ajax
    ({
      type: "GET",
      url: URL,
      dataType: 'json',
      async : false,
      headers: {
        "Authorization": "Basic " + btoa(val.owner_email+ ":" + val.owner_password)
      },
      success: function(data){
        id = data[0]["id"];
      }
    });

    URL = "https://" + val.owner_domain + ".freshsales.io/api/leads/" + id ;
    var leads_response = $.ajax({
      type: "GET",
      url: URL,
      dataType: 'json',
      headers : {
        "Authorization": "Basic " + btoa(val.owner_email+ ":" + val.owner_password)
      },
      success: function(data){
        document.getElementById('first-name').innerHTML = data["lead"]["first_name"];
        document.getElementById('last-name').innerHTML = data["lead"]["last_name"];
        document.getElementById('user-mail-id').innerHTML = data["lead"]["email"];


      }
    });

  });
  function closeWindow(){
    chrome.runtime.sendMessage({message: "close"});
  }

  document.getElementById('close').addEventListener('click',closeWindow);
});
