//  on installing setting the stotage variable to true
chrome.runtime.onInstalled.addListener(function(details){
  if(details.reason = "install"){
    chrome.storage.sync.set({'enable':'0'});
  }
});
