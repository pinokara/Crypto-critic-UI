const {creditCards} = require("../constants/constants");

function fromNumber(num) {
    num = (num + '').replace(/\D/g, '');
    for (let i = 0; i < creditCards.cardTypes.length; i++) {
        let card = creditCards.cardTypes[i];
        if (card.pattern.test(num)) {
            return card;
        }
    }
    return null;
}

const CcUtil = {
    fromNumber,
    luhnCheck: function (num) {
        let digit, odd = true, sum = 0, i, len;
        let digits = (num + "").split("").reverse();
        for (i = 0, len = digits.length; i < len; i++) {
            digit = digits[i];
            digit = parseInt(digit, 10);
            if ((odd = !odd)) {
                digit *= 2;
            }
            if (digit > 9) {
                digit -= 9;
            }
            sum += digit;
        }
        return sum % 10 === 0;
    }
};

exports.CcUtil = CcUtil;