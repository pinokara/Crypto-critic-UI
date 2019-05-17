import React from "react";
import {countries} from "../../../countries";
import {countryServices} from "../../../services/country-info";
import {themeServices} from "../../../services/theme-info";
import {coinsList} from "../../../../../assets/cryto-data/coins-list";
import {SearchArea} from "../search-area/search-area";
export class AppHeader extends React.Component{
    constructor(props){
        super(props);
        this.state={
        };
    };
    render(){
        //
        let headItems=[
            {
                label:'Login',
            },
            {
                label:'Register'
            },
            {
                label :null ,
                comp : <SelectCountry />
            }
        ]
        let theme = themeServices.getTheme();
        return(
            <div className='app-header'>

                <div className='main-header child-cover flex-row'>
                    <a href="#">
                        <img height='50px' width='50px' src="/coins/bitcoin.png" alt=""/>
                    </a>
                    <SearchArea
                        list={coinsList}
                        renItem={(item, index) => <a key={index} href={`/coin/${item.id}`}><div  className='search-item flex-row'>
                            <img width='25' height='25' src={`/coins/${item.id}.png`} alt=""/>
                            <span>{item.name}</span>
                        </div></a>}
                    />
                    <div className='right-head flex-row'>
                        <div className="head-item pointed"
                             onClick={()=>{

                                 themeServices.setTheme({dark : theme && theme.dark==true  ? false :true})
                             }}
                        >
                            {
                                theme && theme.dark ?<i
                                    className="fas fa-lightbulb"></i>: <i className="fas fa-moon"></i>
                            }
                        </div>
                        {
                            headItems.map((o,i)=>{
                                return(
                                    <div key={i} className='head-item pointed'>
                                        {
                                            o.label ?o.label : o.comp
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        );
    }
}

class SelectCountry extends React.Component{
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
                    Languages
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