import React from "react";
import {AppHeader} from "./app-header/app-header";
import {InputForm} from "../../common/input-form/input-form";
import {SearchArea} from "./search-area/search-area";

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
                <div className='search-panel child-cover'>
                    <SearchArea
                        // list={}
                    />
                </div>
                <div className='child-cover'>
                    {mainChild()}
                </div>
            </div>
        );
    }
}
