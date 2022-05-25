import './range-slider.scss';
import noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
const slider = document.querySelector('.range-slider__container');

noUiSlider.create(slider, {
    start: [5000, 10000],
    connect: true,
    range: {
        'min': 0,
        'max': 20000
    }
});

const changePricesText = (values, handle, unencoded, tap, positions, noUiSlider) => {
  console.log(values);
}

slider.noUiSlider.on('change', changePricesText);