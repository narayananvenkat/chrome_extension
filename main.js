var gmail;


function refresh(f) {
  if( (/in/.test(document.readyState)) || (typeof Gmail === 'undefined') ) {
    setTimeout('refresh(' + f + ')', 10);
  } else {
    f();
  }
}


var main = function(){
  // NOTE: Always use the latest version of gmail.js from
  // https://github.com/KartikTalwar/gmail.js
  console.log(document.URL);
  gmail = new Gmail();
  ele = gmail.get.email_data('15c81e796b880281');
  console.log('Hello');
}


refresh(main);
