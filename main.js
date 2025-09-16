const EMPTY_HEART = '♡';
const FULL_HEART = '♥';

function likeCallback(event) {
  const heart = event.target;
  
  mimicServerCall()
    .then(function () {
      if (heart.innerText === EMPTY_HEART) {
        heart.innerText = FULL_HEART;
        heart.classList.add('activated-heart');
      } else {
        heart.innerText = EMPTY_HEART;
        heart.classList.remove('activated-heart');
      }
    })
    .catch(function (error) {
      const modal = document.getElementById('modal');
      modal.classList.remove('hidden');
      modal.innerText = error;
      setTimeout(() => modal.classList.add('hidden'), 3000);
    });
}

document.addEventListener('DOMContentLoaded', () => {
  const likeButtons = document.querySelectorAll('.like-glyph');
  likeButtons.forEach(button => button.addEventListener('click', likeCallback));
});

function mimicServerCall(url = "http://mimicServer.example.com", config = {}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2;
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}