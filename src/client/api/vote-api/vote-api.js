import {api} from "../api";


export const voteApi={
    voteCoin : (id) => api.get(`/api/vote/${id}`),
    getVotes:()=> api.get('/api/get/votes')
}