$(document).ready(function(){
//  alert('hello');
  chrome.storage.sync.get(["email","name"],function(val){
    document.getElementById('user-name').innerHTML = val.name;
    document.getElementById('user-mail-id').innerHTML = val.email;
  });
});
