import React from "react";
import {AppHeader} from "./app-header/app-header";
import {InputForm} from "../../common/input-form/input-form";

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

class SearchArea extends React.Component{
    constructor(props){
        super(props)
        this.state={
            value :'',
            display :false
        }
    }

    render(){
        const {display, value} =this.state;
        return(
            <div className='search-area'>
                <input type="text"
                       value={this.state.value}
                       onChange={(e)=>{
                           this.setState({value :e.target.value})
                       }}
                       onFocus={()=> this.setState({display :true})}
                       onBlur={()=> this.setState({display :false})}
                       className='input-search' />

                {
                    display && (
                        <div className='dropdown-content'>
                            hahah
                        </div>
                    )
                }
            </div>
        )
    }
}