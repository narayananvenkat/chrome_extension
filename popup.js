
$(document).ready(function(){
  chrome.storage.sync.get("enable",function(val){
    if(val.enable == "1"){
      document.getElementById('checkbox').checked = true;
    }
    else {
      document.getElementById('checkbox').checked = false;
    }
  });
});
function isEnabled(){
  var value;
  chrome.storage.sync.get("enable",function(val){
    console.log(val.enable);
    //alert(val.enable);
    value = val.enable;
    if(value == "1"){
      chrome.storage.sync.set({"enable":"0"});
      document.getElementById('checkbox').checked = false;
     }
     if(value == "0"){
       chrome.storage.sync.set({"enable":"1"});
       document.getElementById('checkbox').checked = true;
     }
  }); //get from somewhere



}

document.getElementById('checkbox').addEventListener('click',isEnabled);
