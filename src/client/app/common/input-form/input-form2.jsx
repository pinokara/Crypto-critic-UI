import React from "react";
export class InputForm2 extends React.Component{
    constructor(props){
        super(props);
    };
    render(){
        const {label=null,value='',style={}, type='text',onChange, placeholder,...props} =this.props ;
        return(
            <div className="input-form2">
                {
                    label &&  <span className="label">{label}</span>
                }
                <input
                    type={type}
                    style={style}
                    placeholder={placeholder}
                    value={value}
                    min='0'
                    onChange={(e)=> {
                        onChange(e.target.value)
                    }}
                />
            </div>
        );
    }
}