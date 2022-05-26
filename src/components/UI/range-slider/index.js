import './range-slider.scss';
import noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
const slider = document.querySelector('.range-slider__container');

noUiSlider.create(slider, {
  start: [5000, 10000],
  step: 500,
  tooltips: true,
  connect: true,
  range: {
      'min': 0,
      'max': 20000
  },
  format: {
    from: function (formattedValue) {
      return Number(formattedValue);
    },
    to: function(numericValue) {
      return Math.round(numericValue);
    }
  }
});

const changePricesText = (values, handle, unencoded, tap, positions, noUiSlider) => {
  document.querySelector('.range-slider__price').innerHTML = `${values[0]}₽ - ${values[1]}₽`;
}

slider.noUiSlider.on('change', changePricesText);