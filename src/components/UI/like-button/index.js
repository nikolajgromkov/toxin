import './like-button.scss'

const allLikeButtons = document.querySelectorAll('.like-button');

allLikeButtons.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    const target = e.currentTarget;
    const likesCount = target.querySelector('.like-button__counter');
    likesCount.innerText = parseInt(likesCount.innerText) + 1;
    target.classList.add('like-button--active');
  })
})