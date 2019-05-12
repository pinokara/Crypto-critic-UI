import React from "react";

export class LoadingPanel extends React.Component{
    constructor(props){
        super(props);
        this.state={
        };
    };
    render(){
        const {height = 50} = this.props;
        return(
            <div style={{height :height}} className='loading-panel'>
                <img src="/assets/img/loading.gif" alt=""/>
            </div>
        );
    }
}