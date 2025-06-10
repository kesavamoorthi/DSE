// EmailJS SDK loader
(function(){
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.async = true;
  script.src = 'https://cdn.jsdelivr.net/npm/emailjs-com@3/dist/email.min.js';
  script.onload = function() {
    if(window.emailjs) {
      emailjs.init('eY5Snfq6EeF8vG_J9'); // TODO: Replace with your EmailJS public Key
    }
  };
  document.head.appendChild(script);
})();
