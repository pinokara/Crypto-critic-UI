const nameSpaceToDash=(str)=>{
    return str.trim().replace(/\s+/g, '-').toLowerCase();
}
const nameDashToSpace=(str)=>{
    return str.trim().replace(/-/g, ' ').toLowerCase();
}
const convertNameUpperFirst=(str)=>{
    var arrS= str.split(" ") ;
    var rs ="" ;
    for(let i=0 ; i < arrS.length ; i++){
        for(let j=0 ; j<  arrS[i].length ; j++){
            if(j==0) rs+= arrS[i][0].toUpperCase() ;
            else{
                rs+= arrS[i][j].toLowerCase();
            }
        }
        rs+= " ";
    }
    rs=rs.trim();
    console.log(rs)
    return rs ;
}

module.exports={
    nameSpaceToDash,
    nameDashToSpace,
    convertNameUpperFirst
}