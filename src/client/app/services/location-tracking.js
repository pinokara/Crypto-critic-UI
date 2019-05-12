import {addRemove} from "../../../utils/components-utils";

let add = 1;
let listeners = [];
export const requestWithLocation = req => (arg=null) => req(arg,add);

export const locTracking = {
    getAdd : () =>add,
    setAdd : (a=1) =>{
        add=a;
        listeners.forEach(func => func())
    },
    onChange: addRemove(listeners)

};
