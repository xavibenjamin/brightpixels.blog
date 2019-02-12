(function(window, document, undefined) {
  'use strict';

  // Feature test
  // if (!('localStorage' in window)) return;

  // Get our newly insert toggle
  var nightMode = document.querySelector('#dark-mode-toggle');
  if (!nightMode) return;

  // When clicked, toggle night mode on or off
  nightMode.addEventListener(
    'click',
    function(event) {
      document.documentElement.classList.toggle('night-mode');
      if (document.documentElement.classList.contains('night-mode')) {
        localStorage.setItem('nightMode', true);
        return;
      }
      localStorage.removeItem('nightMode');
    },
    false
  );
})(window, document);
