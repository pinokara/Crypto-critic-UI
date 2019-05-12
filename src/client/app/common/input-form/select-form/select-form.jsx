import React from "react";
export class SelectForm extends React.Component{
    constructor(props){
        super(props);
        this.state={
        };
    };
    render(){
        const {tit ,arr ,onChange,empty} = this.props
        return(
            <div className="select-form">
                <span className="tit" >{tit}</span>
                <span className={`${empty?`warning`:`hide`}`}>(Không được bỏ trống)</span>
                <select
                    id="myOptions" name="typepay"
                    onChange={()=>onChange($("#myOptions option:selected").text(),"payType")}
                >
                    <option value="none"></option>
                    {
                        arr.map((o,index)=>{
                            return(
                                <option key={index} value={o}
                                >{o}
                                </option>
                            )
                        })
                    }

                </select>
            </div>
        );
    }
}