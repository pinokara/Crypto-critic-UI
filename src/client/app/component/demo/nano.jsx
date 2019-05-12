import React from "react";

export class Demo extends React.Component{
    constructor(props){
        super(props);
        this.state={
        };
    };

    render(){
        const {lan} = this.props;
        console.log(this.props)
        return(
            <div className="demo">
                HALALA
                HALALA
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
            </div>
        );
    }
}