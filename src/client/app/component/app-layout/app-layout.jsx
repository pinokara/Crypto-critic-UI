import React from "react";
import {AppHeader} from "./app-header/app-header";

export class AppLayout extends React.Component{
    constructor(props){
        super(props);
        this.state={
        };
    };
    render(){
        const {mainChild,...props} =this.props ;
        return(
            <div className='app-layout'>
                <AppHeader/>

                <div className='child-cover'>
                    {mainChild()}
                </div>
            </div>
        );
    }
}