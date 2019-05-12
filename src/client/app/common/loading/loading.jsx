import React from "react";
export class Loading extends React.Component{
    constructor(props){
        super(props);
        this.state={
        };
    };
    render(){
        const {cName} = this.props
        return(
            <div className={`${cName}`}>
            </div>
        );
    }
}