import {removeDuplicate} from "./components-utils";

let transformLog = (logs) =>{

    let noDuplicate = removeDuplicate(logs.map(x => x.bill_id));
    return noDuplicate.reduce((total, cur) => {
        total[cur] = logs.filter(log => log.bill_id === cur);
        return total;
    }, {});
};

let mergeBillsData = ({bills,customers})=>{
    return bills.map(bill => {
        // let {_id} = bill;
        // let newLogs = transformLog(logs);
        // if (logs && newLogs.hasOwnProperty(_id)) {
        //     let log = newLogs[_id];
        //     return {...bill, log};
        // }
        return {...bill, customer: customers.find(c => c._id === bill.customerId)};
    });
};

let mergeCustomersData = ({bills,customers}) => {
    return customers.map(c => {
        return {...c, bills: bills.filter(x => x.customerId === c._id)}
    })
};

export {
    transformLog,
    mergeBillsData,
    mergeCustomersData
};