import {calAllBills} from "./bill-utils";

let getRealIncome = (receive, owe) => receive - owe;
let sortByPurchaseCount = (c1 ,c2) => c2.bills.length - c1.bills.length;
let sortByIncome = (c1, c2) =>{
    let total1 = calAllBills(c1.bills);
    let total2 = calAllBills(c2.bills);
    let [real1, real2] = [getRealIncome(total1.receive,total1.owe), getRealIncome(total2.receive, total2.owe)];
    return real2 - real1;
};

export {
    sortByIncome,
    sortByPurchaseCount
}