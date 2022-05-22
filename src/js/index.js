import '../scss/style.scss';
import Inputmask from "inputmask";

const maskedTextfields = document.querySelectorAll(".js-textfield-masked");
if (maskedTextfields !== null){
    maskedTextfields.forEach((textfield) => {
        const im = new Inputmask("99.99.9999", {placeholder: "ДД.ММ.ГГГГ"});
        im.mask(textfield);
    })
}

