import React from "react";
export class InputForm2 extends React.Component{
    constructor(props){
        super(props);
        this.state={
            val: this.props.defaultValue || "",
        };
    };
    render(){
        const {val} =this.state
        const {label, onChange, type, placeholder} =this.props ;
        return(
            <div className="input-form2">
                <span className="label">{label}</span>
                <input
                    type="text"
                    placeholder={placeholder}
                    value={val}
                    onChange={(e)=> {
                        onChange(type,e.target.value)
                        this.setState({
                            val : e.target.value
                        })
                    }}
                />
            </div>
        );
    }
}