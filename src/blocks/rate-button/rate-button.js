/* global document */
import ready from '../../js/utils/documentReady';

ready(function() {

  const allRateButtons = document.querySelectorAll('.rate-button');
  const activeClass = 'rate-button__star--active';

  allRateButtons.forEach((rateButton) => {
    const allCurrentStars = rateButton.querySelectorAll('.rate-button__star')
    allCurrentStars.forEach((star) => {
      star.addEventListener('click', e =>{
        const target = e.currentTarget;
        const clickedStarNum = target.dataset.num;
        allCurrentStars.forEach((s) => {
          if (clickedStarNum >= s.dataset.num) s.classList.add(activeClass);
          else s.classList.remove(activeClass);
        })
      })
    })
  })
});
