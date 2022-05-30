import './date-dropdown.scss';
import AirDatepicker from 'air-datepicker';
import 'air-datepicker/air-datepicker.css';

const checkInInput = document.querySelector('.js-checkin-input');
const checkOutInput = document.querySelector('.js-checkout-input')
const checkInDatepicker = new AirDatepicker(checkInInput, {
    range: true,
    onSelect: ({date, formattedDate, datepicker}) => {
        checkInInput.value = formattedDate[0];
        if(formattedDate[1]) checkOutInput.value = formattedDate[1];
    }
})

checkOutInput.addEventListener('click', () => checkInDatepicker.show())
