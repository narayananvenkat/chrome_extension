//  on installing setting the stotage variable to true
chrome.runtime.onInstalled.addListener(function(details){
  if(details.reason = "install"){
    chrome.storage.sync.set({'enable':'0'});
  //  chrome.storage.sync.set({'flag':'0'});
  }
});

chrome.runtime.onMessage.addListener(function(request,sender,sendResponse){

  if(request.message == "close"){

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {message: "close"});
    });

  }
  if(request.message == "current_email"){
    //var email = "hey";
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {message: "current_email"});
    });

    //console.log(email);

  }
});
