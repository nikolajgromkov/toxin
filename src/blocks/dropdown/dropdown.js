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

});