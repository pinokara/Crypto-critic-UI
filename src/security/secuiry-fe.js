import {userApi} from "../client/api/user/user-api";
import {userServices} from "../client/app/services/user-info";
import {cache} from "../client/app/common/cache";
export let security = {
    login: (data) => {
        return new Promise((resolve, reject)=>{
            userApi.login(data).then((res) => {
                cache.set(res.token,"token");
                userServices.setUser(res.user);
                resolve();
            }, (err) => {
                reject(err);
            })
        })
    },
    init: () => {
        return new Promise((resolve, reject)=>{
            userApi.me().then((user) => {
                console.log("me")
                userServices.setUser(user);
                resolve();

            }, () => {
                localStorage.removeItem("token");
                resolve();
            })
        })

    },
    logout: () => {
        userServices.setInfo(null);
        localStorage.removeItem("token");
    }
};