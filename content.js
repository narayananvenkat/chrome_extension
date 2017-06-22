$(document).ready(function(){
  chrome.storage.sync.get("enable",function(val){
    if(val.enable == "1"){
//      alert('enabled');
      var j = document.createElement('script');
      j.src = chrome.extension.getURL('jquery-1.10.2.min.js');
      (document.head || document.documentElement).appendChild(j);

      var myCss  = document.createElement('link');
      myCss.rel = 'stylesheet';
      myCss.type = 'text/css';
      myCss.href = chrome.extension.getURL('myCss.css');

      var email = document.getElementsByClassName("gb_wb")[0].innerHTML;

      (document.head || document.documentElement).appendChild(myCss);
      chrome.storage.sync.get(email,function(option){
        if(("undefined").match(option.email)){
          var iframe = document.createElement('iframe');
          iframe.id = 'myFrame';
          iframe.src = chrome.extension.getURL('myFrame.html');
          $(".AO").append(iframe);
        }
        else{
          var iframe = document.createElement('iframe');
          iframe.id = 'myFrame';
          iframe.src = chrome.extension.getURL('index.html');
          $(".AO").append(iframe);
        }
      });


      $(window).on('hashchange', function() {
        //.. work ..
        chrome.storage.sync.get("current_email",function(option){

          if(!("undefined").match(option.current_email)){
            var url = document.URL;
            var pattern = "/#inbox/";
            if(url.match(pattern)){
              var ele = document.getElementsByClassName('gD');
              var sender_email = ele[0].getAttribute("email");
              chrome.storage.sync.set({'sender_email': sender_email});
              $("#myFrame").attr("src", chrome.extension.getURL('window1.html') );
            }
          }
        });
      });

    }
    else{
      alert("not enabled");
    }
  });
});
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.message == "close"){
      $("#myFrame").attr("src", chrome.extension.getURL('index.html') );
    }

    if(request.message == "current_email"){
      //alert(document.getElementsByClassName("gb_wb")[0].innerHTML);
      chrome.storage.sync.set({"current_email": document.getElementsByClassName("gb_wb")[0].innerHTML});
    }
  });
