import React from "react";
// import "./text-area-form.styl"
export class TextAreaForm extends React.Component{
    constructor(props){
        super(props);
        this.state={
            mess: ""
        };
    };

    handleOnChange(e){
        const {onChange,type} =this.props

        var val = e.target.value

        onChange(type,val) ;
        this.setState({ mess :val})

    }
    render(){
        const {label ,onChange,type} =this.props
        const {mess}= this.state
        return(
            <div className="text-area-form">
                <span className="label">{label}</span>
                <textarea className="text-area" value={mess}
                          onChange={(e)=>this.handleOnChange(e)}
                />
            </div>
        );
    }
}