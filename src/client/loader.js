import React from "react"
import ReactDOM from "react-dom";
// import "./styl/main.styl";
import {MainRoutes} from "./app/main-routes";
import {security} from "../security/secuiry-fe";
// console.log = function(){};
security.init().then(()=>{
    ReactDOM.render(<MainRoutes/>,document.getElementById("wrapper"));
})

