import React from "react";
import {countries} from "../../../countries";
import {countryServices} from "../../../services/country-info";
import {themeServices} from "../../../services/theme-info";
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
        // if(theme && theme.dark ==true){
        //     let arr = ['body','div', 'button','h1','h3','h2','h4','h5','tr','td','thead','tbody','ul','li','section']
        //     for(let i=0 ; i<  arr.length ;i++){
        //         var j,
        //             tags = document.getElementsByTagName("body")[0].getElementsByTagName(arr[i]),
        //             total = tags.length;
        //         for ( j = 0; j < total; j++ ) {
        //             tags[j].style.background = '#292a36';
        //             tags[j].style.color = 'white'
        //         }
        //     }
        // }
        return(
            <div className='app-header'>
                <div className='main-header child-cover flex-row'>
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