$(document).ready(function(){
//  alert('hello');
  document.getElementById('user-details').style.display = "none";


  chrome.runtime.sendMessage({message: "current_email"});

  chrome.storage.sync.get(["current_email","sender_email"],function(value){
    var current_email = value.current_email;
    var sender_email = value.sender_email;
    console.log(current_email);
    console.log(sender_email);
    chrome.storage.sync.get(current_email,function(val){
      var URL = "https://" + val.owner_domain + ".freshsales.io/search.json?q=" + sender_email + "&include=lead";
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
          document.getElementById('user-details').style.display = "block";
          document.getElementById('first-name').innerHTML = data["lead"]["first_name"];
          document.getElementById('last-name').innerHTML = data["lead"]["last_name"];
          document.getElementById('user-mail-id').innerHTML = data["lead"]["email"];
        }

      });

    });


  });



  function closeWindow(){
    chrome.runtime.sendMessage({message: "close"});
  }

  document.getElementById('close').addEventListener('click',closeWindow);
});
