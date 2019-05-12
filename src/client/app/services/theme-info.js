
import {addRemove} from "../../../utils/components-utils";

let listeners = [];
// let user = null;
let theme = (()=> {
    let dataString = localStorage.getItem("theme");
    let theme = dataString == null || dataString=="undefined" ? null : JSON.parse(dataString);
    if (theme == null) {
        return null;
    }
    return theme;
})();
let themeServices = {
    getTheme: () => theme,
    setInfo: (info=null) => {
        theme = info;
        listeners.forEach(func => func())
    },
    setTheme: (t1) => {
        theme = t1;

        if (theme) {
            localStorage.setItem("theme", JSON.stringify(theme));
        } else {
            localStorage.removeItem("theme");
        }

        listeners.forEach((l) => l(theme));
    },
    onChange:addRemove(listeners)
};

export {themeServices};