import moment from "moment"
import {numEqual} from "./components-utils";

let daysInWeek = () => ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let monthsInYear = (month=13) => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].slice(0, month - 1);
let getDateInfo = (month, year) => new Date(year, month - 1, 1);

let convertMonth = month => moment(new Date(0,month,0)).format("MMMM");

let addZero = num => {
    num = Number(num);
    if (num.toString().length === 1) {
        return "0" + num;
    }
    return num;
};

let myMoment = date => {
    let time = moment(date);
    return type => time.format(type);
};

let getDay = date => type =>{
    let temp = {
        start: date.setHours(0,0,0,0),
        end: date.setHours(23,59,59,999)
    };
    return new Date(temp[type]);
};

let toDayStart = date => {
    return new Date(date.setHours(0,0,0,0));
};

let toDayEnd = date => {
    return new Date(date.setHours(23,59,59,999));
};

let convertTimeStr = time =>{
  let [day,month,year] = time.split("/");
  return new Date(Number(year),Number(month)-1,Number(day));
};
let roundTwenty = year =>{
    let arr = [];
    for(let i=1;i<=20;i++){
        arr.push(i);
    }
    let result = y => arr.map(elem => y+elem);
    for(let i = year-1;i>=0;i--){
        if(i%20===0){
            return {
                years:result(i),
                range:{
                    head:i+1,
                    tail:i+20
                }
            };
        }
    }
};

let sameDay = ({day:d1,month:m1,year:y1},{day:d2,month:m2,year:y2}) => numEqual(d1,d2) && numEqual(m1,m2) && numEqual(y1,y2);

let convertMonthYear = ({month,year}) =>{
  return  moment(new Date(year,month-1,1)).format("MMMM YYYY");
};

let daysInMonth = (month, year) => new Date(year, month, 0).getDate();


let getCalendar = ({year, month}) => {
    year = Number(year);
    month = Number(month);
    let result = [];
    let firstIndex = getDateInfo(month, year).getDay();
    let lastIndex = daysInMonth(month, year) + firstIndex - 1;
    let rangeHead = firstIndex - 1;
    let rangeTail = 41 - lastIndex - 1;
    for (let i = 0; i < 42; i++) {
        if (i < firstIndex) {
            result.push({
                day: daysInMonth(month - 1, year) - (rangeHead - i),
                month: getDateInfo(month - 1, year).getMonth() + 1,
                year: getDateInfo(month - 1, year).getFullYear(),
                belong:false
            });
        } else if (i <= lastIndex) {
            result.push({
                day: addZero(i - rangeHead),
                month,
                year,
                belong:true
            });
        } else {
            result.push({
                day: addZero(1 + ((i + rangeTail) - 41)),
                month: getDateInfo(month + 1, year).getMonth() + 1,
                year: getDateInfo(month + 1, year).getFullYear(),
                belong:false

            });
        }
    }
    return matchWeek(result);
};


let daysInYear = (year, month) => {
    return monthsInYear(month).reduce((total, cur) => total + new Date(year, cur, 0).getDate(), 0)
};


let determineWeek = ({day, month, year}) => {
    let daysTillNow = daysInYear(year, month) + Number(day);
    return Math.ceil(daysTillNow / 7);

};

let format = time => type => moment(time).format(type);

let getMax = arr => {
    return arr.sort(({day:day1},{day:day2})=>Number(day2)-Number(day1))[0];
};

let getMost = arr =>{
    let first = arr[0].month;
    let type1 = arr.filter(day=>day.month===first);
    let type2 = arr.slice(type1.length);
    return getMax(type1.length > type2.length ? type1 : type2);
};

let matchWeek = (arr) => {
    let newArr = [];
    let cutArr = (cut, rest) => {
        if (!cut.length) {
            return newArr;
        }
        let week = getMost(cut);
        newArr.push({
            days: cut,
            //week: determineWeek(week)
        });
        return cutArr(rest.slice(0, 7), rest.slice(7));
    };
    return cutArr(arr.slice(0, 7), arr.slice(7));
};


export {
    daysInWeek,
    getCalendar,
    sameDay,
    matchWeek,
    addZero,
    convertMonthYear,
    convertMonth,
    monthsInYear,
    roundTwenty,
    format,
    getDay,
    toDayStart,
    toDayEnd,
    myMoment,
    convertTimeStr
};