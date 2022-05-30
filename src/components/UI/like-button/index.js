const allLikeButtons = document.querySelectorAll('.like-button');

allLikeButtons.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    const target = e.currentTarget;
    const activeClass = 'like-button--active';
    const isLiked = e.currentTarget.classList.contains(activeClass);
    const likesCount = Number(target.innerText);
    if (isLiked) {
      target.innerText = likesCount - 1;
      target.classList.remove(activeClass);
    } else {
      target.innerText = likesCount + 1;
      target.classList.add(activeClass);
    }
  })
})