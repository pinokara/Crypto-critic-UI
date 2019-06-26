import {api} from "../api";

var host = 'http://45.32.34.32:3001' ;
var toURI =(coin,endpoint)=> `${host}/api/${coin}/${endpoint}`
export const explorerApi={
    getTx:(coin,txid) => api.get(toURI(coin,'tx')+`/${txid}`),
    getBlock:(coin,hash) => api.get(toURI(coin,'block')+`/${hash}`),
    getBlockHeight:(coin,index) => api.get(host+`/api/get/block-height/${index}`),
    getAddress : (coin, id) => api.get(toURI(coin,'address')+`/${id}`)
}