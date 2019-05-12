import React from "react";
import {isAllNumber, isPhoneNumber} from "../convert";
export class InputForm extends React.Component{
    constructor(props){
        super(props);
        this.state={
            val: this.props.defaultValue || "",
            invalidPhone: false
        };
    };
    handleOnChange(e){
        var val =  e.target.value
        const {type ,onChange,allNumber ,doCheck} =this.props
        if(allNumber===true){
            if(val===""){
                this.setState({val:"" })
                return;
            }
            if(isAllNumber(val)){
                onChange(type,val);
                this.setState({ val: val})
            }
        }else{
            onChange(type,val)
            this.setState({ val: val})
        }

    }


    render(){
        const {tit , placeholder,doCheck} = this.props
        const {val} =this.state
        if(doCheck && val===""){
            var empty=true
        }
        return(
            <div className="input-form">
                <span className="tit">{tit}</span>
                {/*<span className={`${empty?`warning`:`hide`}`}>(Không được để trống)</span>*/}
                <input
                    type="text"
                    placeholder={placeholder}
                    value={val}
                    onChange={(e)=>this.handleOnChange(e)}
                />
            </div>
        );
    }
}