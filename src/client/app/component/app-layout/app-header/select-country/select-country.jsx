import {countryServices} from "../../../../services/country-info";
import React from "react";
import {countries} from "../../../../countries";

export class SelectCountry extends React.Component{
    constructor(props){
        super(props) ;
        this.state={
        }
    }
    render(){
        let country =countryServices.getCountry() || {
            code: 'us',
            flag: 'us.svg',
            name:'United States'
        };
        return(
            <div
                className='select-country'>
                <div
                    className='label'>
                    <img className='country-img' width='20px' src={`/assets/img/flags/${country.flag}`} alt=""/>
                    <i className="fas fa-caret-down"></i>
                </div>

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

            </div>
        )
    }
}