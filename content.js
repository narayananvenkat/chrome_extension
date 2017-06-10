$(document).ready(function(){
  chrome.storage.sync.get("enable",function(val){
    alert(val.enable);
    if(val.enable == "1"){
      alert('enabled');
      var j = document.createElement('script');
      j.src = chrome.extension.getURL('jquery-1.10.2.min.js');
      (document.head || document.documentElement).appendChild(j);
console.log("step 1");
      var myCss  = document.createElement('link');
      myCss.rel = 'stylesheet';
      myCss.type = 'text/css';
      myCss.href = chrome.extension.getURL('myCss.css');
      (document.head || document.documentElement).appendChild(myCss);
console.log("step 2");

      var iframe = document.createElement('iframe');
      iframe.id = 'myFrame';
      iframe.src = chrome.extension.getURL('myFrame.html');
      $(".AO").append(iframe);
      console.log("step 3");
      $(window).on('hashchange', function() {
        //.. work ..
          var url = document.URL;

          var pattern = "/#inbox/";
          if(url.match(pattern)){

            var ele = document.getElementsByClassName('gD');
            var email = ele[0].getAttribute("email");
            var name = ele[0].getAttribute("name");


          //  alert(ele[0].getAttribute("email"));

            chrome.storage.sync.set({'name': name, 'email': email});

            $("#myFrame").attr("src", chrome.extension.getURL('window1.html') );
          }
      });
    }
    else{
      alert("not enabled");
    }
  })
});
