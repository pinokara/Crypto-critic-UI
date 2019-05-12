import {api} from "../api";


var uri=`https://api.coingecko.com/api/v3/coins`;
const listApi={
    getCoinURI:(id) =>`${uri}/${id}?localization=false&sparkline=true`,
    getChartURI:(id,day) =>`${uri}/${id}/market_chart?vs_currency=usd&days=${day}`
}

export  const cryptoApi={
    getCoin:(id)=> api.get(listApi.getCoinURI(id)),
    getChart:(id, day) => api.get(listApi.getChartURI(id, day))
}