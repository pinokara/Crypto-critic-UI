import {afterConvert, convertCash} from "./components-utils";

export const billUtils = items =>{
    let totalMoney = (x,y) => Number(x) * Number(y);
    let getSale = (x,y) => x*(y/100);
    let totalPrice = items.reduce((total,{price,quantity})=>{
        return total + totalMoney(price,quantity || 1);
    },0);
    let totalSale = items.reduce((total,{price,quantity,sale})=>{
        return total + getSale(totalMoney(price,quantity || 1),sale || 0);
    },0);

    let calVAT = (vat=0) => (totalPrice-totalSale)*(vat/100);
    let calTotalMoney = (vat=0) => afterConvert(totalPrice - totalSale + calVAT(Number(vat)));
    return {
        totalMoney,
        getSale,
        totalPrice,
        totalSale,
        calVAT,
        calTotalMoney
    }
};

export let customerIsOwe = (customer) => customer.bills.find(bill => !!bill.isOwe);

export let calAllBills = (bills) => {
    return bills.reduce((total, cur) => {
        let {items, isOwe, vat} = cur;
        let {owe, receive} = total;
        let utils = billUtils(items);
        let {totalPrice, totalSale, calVAT} = utils;
        let amount = totalPrice - totalSale + calVAT(Number(vat));
        if (isOwe) {
            return {owe: owe + amount, receive};
        }
        return {receive: receive + amount, owe};
    }, {receive: 0, owe: 0})
};

export let categorizeBills = (ifOwe) => (bills) => bills.filter(({isOwe}) => !!isOwe === ifOwe);
