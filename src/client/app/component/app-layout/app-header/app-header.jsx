import React from "react";
import {countries} from "../../../countries";
import {countryServices} from "../../../services/country-info";
import {themeServices} from "../../../services/theme-info";
import {coinsList} from "../../../../../assets/cryto-data/coins-list";
import {SearchArea} from "../search-area/search-area";
import {Link} from "react-router-dom";
import {SelectOption} from "../../../common/select-option/select-option";
export class AppHeader extends React.Component{
    constructor(props){
        super(props);
        this.state={
            searchKey: '',
            coinSelect: coinsList[0]
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
        const {searchKey, coinSelect} =this.state;
        return(
            <div className='app-header'>


                <div className='main-header flex-row'>
                    <Link className='about' to="/">
                        {/*<img className='logo' height='40px' width='40px' src="/assets/img/logo.png" alt=""/>*/}
                        About
                    </Link>
                    {/*<SearchArea*/}
                        {/*list={coinsList}*/}
                        {/*renItem={(item, index) => <a key={index} href={`/coin/${item.id}`}><div  className='search-item flex-row'>*/}
                            {/*<img width='25' height='25' src={`/coins/${item.id}.png`} alt=""/>*/}
                            {/*<span>{item.name}</span>*/}
                        {/*</div></a>}*/}
                    {/*/>*/}
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
                
                <div className='logo-main text-center'>
                    <img async height='80px' src="/assets/img/main-logo.png" alt=""/>
                </div>

                <div className='txs-search-panel child-cover'>
                    <div className='txs-search'>
                        <input
                            placeholder='Search transactions, blocks, addresses, ENS...'
                            value={searchKey}
                            onChange={(e)=>{
                                this.setState({searchKey : e.target.value})
                            }}
                            className='txs-input' type="text"
                        />

                    </div>
                    <div className='action-panel flex-row'>
                        <SelectOption
                            value={coinSelect}
                            displayValueAs={(val)=> (
                                <div className='flex-row'>
                                    <img style={{marginTop : 6.5 , marginRight:5 }} height='15px' src={`/coins/${val.image}`} alt=""/>
                                    <span>{val.name}</span>
                                </div>
                            )}
                            displayItemsAs={(val)=> (
                                <div style={{height:30}} className='flex-row'>
                                    <img style={{marginTop : 6.5 , marginRight:5 }} height='15px' src={`/coins/${val.image}`} alt=""/>
                                    <div style={{lineHeight:30+'px'}}>{val.name}</div>
                                </div>
                            )}
                            onChange={(val) => this.setState({ coinSelect :val})}
                            list={coinsList}
                        />
                        <button className='txs-search'>
                            Search
                        </button>
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