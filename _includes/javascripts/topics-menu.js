// Topics LIST
// -----------------------------------------
// Shows the complete list of topics.
// -----------------------------------------

var topicsList = document.querySelector('.header__topics');
var topicsButton = document.getElementById('topics-toggle');
var closeButton = document.getElementById('topics-close');

function topicsListReveal() {
  topicsList.classList.toggle('js-is-open');
}

if (topicsButton) {
  topicsButton.addEventListener('click', topicsListReveal);
}

if (closeButton) {
  closeButton.addEventListener('click', function() {
    topicsList.classList.remove('js-is-open');
  });
}
