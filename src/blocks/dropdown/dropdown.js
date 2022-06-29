import ready from '../../js/utils/documentReady';

const pluralize = (num, declensions) => {

  //- Принимает:
  //-   num    {number} - число
  //-   declensions    {array} - массив из трёх склонений

  // todo
  //- сделать изоляцию каждого дропдауна, сейчас цепляет первый при изменении второго
  //- если младенец и взрослых нет то добавляется взрослый
  //- при возвращении на нули восстанавливать placeholder

  const lastDigit = num % 10;
  const lastTwoDigits = num % 100;
  const declensionsArray = declensions.split(',');

  if (lastDigit === 1 && lastTwoDigits !== 11) return declensionsArray[0]
  else if (
    lastDigit === 2 && lastTwoDigits !== 12 || 
    lastDigit === 3 && lastTwoDigits !== 13 ||
    lastDigit === 4 && lastTwoDigits !== 14) return declensionsArray[1]
  else return declensionsArray[2]
  
}

ready(function() {


  const allControls = document.querySelectorAll(".dropdown__control")
  const allCounters = document.querySelectorAll(".counter");

  const getNumberInLimits = (input, action) => {
    const result = Number(input.value) + action;
    if (result < input.min) return input.min;
    else if (result > input.max) return input.max;
    else return result;
  }

  const sumValuesByName = (arr) => {
    return Array.from(arr.reduce(
      (m, {name, value}) => m.set(name, (m.get(name) || 0) + value), new Map
    ), ([name, value]) => ({name, value}));
  }

  const getDropdownCaption = (arr) => {    
    const notZeroElements = arr.filter(el => el.value > 0);
    const caption = notZeroElements.reduce((acc, el, index) => (
      acc + el.value + ' ' + pluralize(el.value, el.name) + (notZeroElements.length !== index + 1 ? ", " : "")
    ), '');
    console.log("notZeroElements", notZeroElements);
    console.log(caption);
    return caption;
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

    

    const countersValues = [];

    Array.prototype.map.call(allCounters, (counter) => {
      const input = counter.querySelector(".counter__input");
      const declensions = input.dataset.declensions;
      //resultText += input.value + " " + pluralize(input.value, declensionsArray);

      countersValues.push({name: declensions, value: parseInt(input.value)});


    })

    console.log(countersValues);

    const resultArray = sumValuesByName(countersValues);

    document.querySelector('.dropdown__control span').innerHTML =  getDropdownCaption(resultArray);

  }

  const handleDropdown = (e) => {
    const dropdownBody = e.currentTarget.parentNode.querySelector(".dropdown__body");
    dropdownBody.classList.toggle("show")
  }

 
  Array.prototype.map.call(allCounters, (counter, index) => {
    counter.querySelector(".counter__minus").addEventListener('click', handleClick);
    counter.querySelector(".counter__plus").addEventListener('click', handleClick);
    counter.querySelector(".counter__input").addEventListener('change', handleChange);
  })

  Array.prototype.map.call(allControls, (control, index) => {
    control.addEventListener('click', handleDropdown);
  })
  
  

});