import React from "react";
import {dataUtils} from "./data-ultils";
import {userApi} from "../client/api/app-api/user-api";
import {postApi} from "../client/api/app-api/post-api";
import {commentApi} from "../client/api/app-api/comment-api";


let eachNoti = {
    follow: ({fromID, ...rest}) => new Promise((res) => {
        let {getBasicUser} = userApi;
        getBasicUser(fromID).then(({name, avatarURL}) => {
            res({
                content: (<span><span className="name-2light">{name}</span> has followed you</span>),
                type: (<i className="far fa-user"/>),
                fromAva: avatarURL,
                ...rest
            });
        })

    }),
    cmt: ({fromID, cmtID, ...rest}) => new Promise((res) => {
        let {getBasicCmt} = commentApi;
        let {getBasicUser} = userApi;
        Promise.all([getBasicUser(fromID), getBasicCmt(cmtID)]).then(data => {

            let [from, cmt] = data;
            res({
                content: (<span><span className="name-2light">{from.name}</span> has commented on your post</span>),
                type: (<i className="far fa-comment"/>),
                fromAva: from.avatarURL,
                cmtImg: cmt.imgURL,
                cmtContent: cmt.content,
                ...rest
            });
        })

    }),
    upload: ({fromID, postID, ...rest}) => new Promise((res) => {
        let {getBasicPost} = postApi;
        let {getBasicUser} = userApi;
        Promise.all([getBasicUser(fromID), getBasicPost(postID)]).then(data => {
            let [from, post] = data;
            res({
                content: (<span><span className="name-2light">{from.name}</span> has uploaded a post</span>),
                type: (<i className="fas fa-upload"/>),
                fromAva: from.avatarURL,
                postImg: post.imgURL,
                postContent: post.content,
                ...rest
            });
        });

    }),
    likePost: ({fromID, postID, ...rest}) => new Promise((res) => {
        let {getBasicPost} = postApi;
        let {getBasicUser} = userApi;
        Promise.all([getBasicUser(fromID), getBasicPost(postID)]).then(data => {
            let [from, post] = data;
            res({
                content: (<span><span className="name-2light">{from.name}</span> has liked on your post</span>),
                type: (<i className="far fa-sticky-note"/>),
                fromAva: from.avatarURL,
                postImg: post.imgURL,
                postContent: post.content,
                ...rest
            });
        });

    }),

};


let createList = ({arr, key}) => {
    return arr.map(noti => {
        let info = eachNoti[key];
        return info(noti);
    });
};

export const notiUtils = {
    getInfo: data =>
        new Promise((resolve) => {
            let promises = [];
            for (let key in data) {
                if (data.hasOwnProperty(key) && data[key].length) {
                    promises = promises.concat(createList({key, arr: data[key]}));
                }
            }
            Promise.all(promises).then(list => {
                resolve(list);
            })

        }),
    sort: arr => {
        let isSort = arr;
        isSort.sort((a, b) => b.time - a.time);
        return isSort
    }
};