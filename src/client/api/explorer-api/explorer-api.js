import {api} from "../api";


export const explorerApi={
    getTx:(txid) => api.get(`/api/get/tx/${txid}`),
    getBlock:(hash) => api.get(`/api/get/block/${hash}`),
    getBlockHeight:(index) => api.get(`/api/get/block-height/${index}`)
}