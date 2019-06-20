import {countryServices} from "../../../../services/country-info";
import React from "react";
import {countries} from "../../../../countries";

export class SelectCountry extends React.Component{
    constructor(props){
        super(props) ;
        this.state={
            display:false
        }
    }

    componentWillMount(){
        document.addEventListener('mousedown',this.handleClick,false) ;
    }

    componentWillUnmount(){
        document.removeEventListener('mousedown',this.handleClick,false) ;
    }
    handleClick=(e)=>{
        if(this.select.contains(e.target)){
            return ;
        }
        this.setState({
            display: false
        })
    }
    render(){
        let country =countryServices.getCountry() || {
            code: 'us',
            flag: 'us.svg',
            name:'United States'
        };
        const {display} =this.state;
        return(
            <div
                ref={select => this.select  = select}
                className='select-country'>
                <div
                    className='label'>
                    <img
                        onClick={()=> this.setState({display :!display})}
                        className='country-img' width='20px' src={`/assets/img/flags/${country.flag}`} alt=""/>
                    <i className="fas fa-caret-down"></i>
                </div>
                {
                    display &&
                    <div className='content-dropdown flex-row'>
                        {
                            countries.map((o,i) =>
                                <img
                                    key={i}
                                    onClick={()=>{
                                        countryServices.setCountry(o)
                                    }}
                                    width='30px' height='30px' src={`/assets/img/flags/${o.flag}`}/>)
                        }
                    </div>
                }


            </div>
        )
    }
}