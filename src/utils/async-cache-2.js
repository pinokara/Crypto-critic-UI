const {Cols} = require("./cols");

const AsyncCache2 = {
    createAsyncCache({asyncGet, matchKey, onChange}) {
        let resolveds = [];
        let loadings = [];

        return {
            getCache(key) {
                let resolved = resolveds.find((resolved) => matchKey(resolved.key, key));
                if (resolved) {
                    return resolved.value;
                }
                let loading = resolveds.find((loading) => matchKey(loading.key, key));
                if (loading) {
                    return null;
                }
                loadings.push({key});

                asyncGet(key).then((value) => {
                    Cols.removeMutateBy(loadings, (loading) => matchKey(loading.key, key));

                    resolveds.push({key, value});
                    onChange();
                });

                return null;
            },
            invalidate(key) {
                console.log(key);
                Cols.removeMutateBy(resolveds, (resolved) => matchKey(resolved.key, key));
            }
        };
    }
};

exports.AsyncCache2 = AsyncCache2;
