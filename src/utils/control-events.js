
const remove1Mutate=(arr,targetFunc)=>{
    console.log("3");
    if (arr=== null) {
        return;
    }

    let i = arr.indexOf(targetFunc);
    if (i === -1) {
        return;
    }
    arr.splice(i, 1);
};

const addRemove=(arr)=>{
    console.log("1");
    return (func) => {

        arr.push(func);

        return () => remove1Mutate(arr, func);
    };
};
export {remove1Mutate,addRemove}