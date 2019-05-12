import {postApi} from "../client/api/app-api/post-api";
import {dataUtils} from "./data-ultils";

export const postUtils = {
    uploadFile: files => {
        let getFile = dataUtils.transformData(files);
        let promises = getFile(f => postApi.uploadPost(f));
        return Promise.all(promises);
    }
};