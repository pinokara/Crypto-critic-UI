import React from "react";
import {themeServices} from "../../../services/theme-info";
import {SelectCountry} from "./select-country/select-country";
import {Link} from "react-router-dom";
import classnames from 'classnames'
export class AppHeader2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    };

    render() {
        let headItems = [
            // {
            //     label:'Login',
            // },
            // {
            //     label:'Register'
            // },
            {
                label: null,
                comp: <SelectCountry/>
            }
        ]

        let routes = [
            {
                label: 'Ranking',
                to: '/'
            },
            {
                label: 'Explorer',
                to: '/explorer'
            },
            {
                label: 'Api',
                to: '/api-page'
            }
        ]

        let theme = themeServices.getTheme();
        return (
            <div className='main-head flex-column'>
                <div className='app-header-2 child-cover flex-column'>
                    <div className='head-left flex-row'>
                        <div className='head-item'>
                            <b>Masternode Projects :</b> <span className='text'>100</span>
                        </div>
                        <div className='head-item'>
                            <b>Market Cap : </b><span className='text'>$279.000.000.000</span>
                        </div>
                        <div className='head-item'>
                            <b>24h Volume : </b> <span className='text'>$279.000.000.000</span>
                        </div>
                        <div className='head-item'>
                            <b>Dash Dominance : </b><span className='text'>55.3%</span>
                        </div>
                    </div>
                    <div className='head-right flex-row'>
                        <div className="head-item pointed"
                             onClick={() => {

                                 themeServices.setTheme({dark: theme && theme.dark == true ? false : true})
                             }}
                        >
                            {
                                theme && theme.dark ? <i
                                    className="fas fa-lightbulb"></i> : <i className="fas fa-moon"></i>
                            }
                        </div>
                        {
                            headItems.map((o, i) => {
                                return (
                                    <div key={i} className='head-item pointed'>
                                        {
                                            o.label ? o.label : o.comp
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>

                </div>

                <div className='page-direct child-cover flex-column'>
                    <a href="/">
                        <div className='web-name'>
                            cryptocritic
                        </div>
                    </a>
                    <div>
                        {
                            routes.map((o, i) => {
                                return (
                                    <Link key={i} to={o.to} className={classnames('drr',{'act' : i==0})}>
                                        {o.label}
                                    </Link>
                                )
                            })
                        }
                    </div>



                </div>
            </div>

        );
    }
}