let parseQuery = query => {
    const regex = /(\w+)=([^&]*)/gi;
    let params = {};
    let data;
    while ((data = regex.exec(query)) !== null){
        params[data[1]] = data[2];
    }
    return params;
};

export {
    parseQuery
}