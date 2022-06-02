import ready from '../../js/utils/documentReady';

const pluralize = (num, declensions) => {

  //- Принимает:
  //-   num    {number} - число
  //-   declensions    {array} - массив из трёх склонений

  const lastDigit = num % 10;
  const lastTwoDigits = num % 100;

  if (lastDigit === 1 && lastTwoDigits !== 11) return declensions[0]
  else if (
    lastDigit === 2 && lastTwoDigits !== 12 || 
    lastDigit === 3 && lastTwoDigits !== 13 ||
    lastDigit === 4 && lastTwoDigits !== 14) return declensions[1]
  else return declensions[2]
}

ready(function() {

  console.log(pluralize(13, ["гость", "гостя", "гостей"]));

  

  const getNumberInLimits = (input, action) => {
    const result = Number(input.value) + action;
    if (result < input.min) return input.min;
    else if (result > input.max) return input.max;
    else return result;
  }

  const handleClick = (e) => {
    const counterInput = e.target.parentNode.querySelector(".counter__input");
    const counterMinus = e.target.parentNode.querySelector(".counter__minus");
    if (e.target.className.match(/\bcounter__minus\b/)) {
      counterInput.value = getNumberInLimits(counterInput, -1);
      if (Number(counterInput.value) === 0) counterMinus.disabled = true;
    } else if (e.target.className.match(/\bcounter__plus\b/)) {
      counterInput.value = getNumberInLimits(counterInput, 1);
      counterMinus.disabled = false;
    }

    counterInput.dispatchEvent(new Event("change"));
  }

  const handleChange = (e) => {
    const counterInput = e.currentTarget;
  }

  const handleDropdown = (e) => {
    const dropdownBody = e.currentTarget.parentNode.querySelector(".dropdown__body");
    dropdownBody.classList.toggle("show")
  }

  const allControls = document.querySelectorAll(".dropdown__control")
  const allCounters = document.querySelectorAll(".counter");
  Array.prototype.map.call(allCounters, (counter, index) => {
    counter.querySelector(".counter__minus").addEventListener('click', handleClick);
    counter.querySelector(".counter__plus").addEventListener('click', handleClick);
    counter.querySelector(".counter__input").addEventListener('chnage', handleChange);
  })

  Array.prototype.map.call(allControls, (control, index) => {
    control.addEventListener('click', handleDropdown);
    
  })
  
  

});