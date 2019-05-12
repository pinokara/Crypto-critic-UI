
import {addRemove} from "../../../utils/components-utils";

let listeners = [];
// let user = null;
let country = (()=> {
    let dataString = localStorage.getItem("country");
    let country = dataString == null || dataString=="undefined" ? null : JSON.parse(dataString);
    if (country == null) {
        return null;
    }
    return country;
})();
let countryServices = {
    getCountry: () => country,
    setInfo: (info=null) => {
        country = info;
        listeners.forEach(func => func())
    },
    setCountry: (c1) => {
        country = c1;

        if (country) {
            localStorage.setItem("country", JSON.stringify(country));
        } else {
            localStorage.removeItem("country");
        }

        listeners.forEach((l) => l(country));
    },
    onChange:addRemove(listeners)
};

export {countryServices};