import 'material-icons/iconfont/material-icons.css';
import '../scss/style.scss';
import Inputmask from "inputmask";

const maskedDates = document.querySelectorAll(".js-textfield-date");
if (maskedDates !== null){
    maskedDates.forEach((datefield) => {
        const im = new Inputmask({placeholder: "ДД.ММ.ГГГГ",  alias: "datetime", inputFormat: "dd.mm.yyyy"});
        im.mask(datefield);
    })
}

const maskedEmails = document.querySelectorAll(".js-textfield-email");
if (maskedEmails !== null){
    maskedEmails.forEach((emailfield) => {
        const im = new Inputmask({alias: "email"});
        im.mask(emailfield);
    })
}

