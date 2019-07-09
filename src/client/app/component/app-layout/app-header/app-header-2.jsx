import React from "react";
import {themeServices} from "../../../services/theme-info";
import {SelectCountry} from "./select-country/select-country";
import {Link} from "react-router-dom";
import classnames from 'classnames'
import {withStyles} from '@material-ui/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import MenuBar from './menu-bar';
import {userServices} from "../../../services/user-info";

const AntTabs = withStyles({
    root: {
        borderBottom: '1px solid #e8e8e8',
    },
    indicator: {
        backgroundColor: '#1890ff',
    },
})(Tabs);
const AntTab = withStyles({
    root: {
        textTransform: 'none',
        minWidth: 72,
        fontSize: 17,
        // fontWeight: theme.typography.fontWeightRegular,
        // marginRight: theme.spacing(4),
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:hover': {
            color: '#40a9ff',
            opacity: 1,
        },
        '&$selected': {
            color: '#1890ff',
            //   fontWeight: theme.typography.fontWeightMedium,
        },
        '&:focus': {
            color: '#40a9ff',
        },
    },
})(Tab);

export class AppHeader2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0
        };
    };

    handleChange(event, newValue) {
        this.setState({
            value: newValue
        });
    }

    render() {
        let user = userServices.getUser();
        console.log(user)
        let headItems = [
            {
                label: null,
                comp: !user ? <Link to='/login'>Login</Link> : user.username,
            },
            {
                label: null,
                comp: <Link to="/register">Register</Link>
            },
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
                    <span className='head-left flex-row'>
                        <span className='head-item'>
                            <b>{"Masternode Projects :"}</b> <span className='text'>{"100   "} <i
                            className="fas fa-circle fa-xs"></i></span>

                            <b>{"   Market Cap : "}</b><span className='text'>{"$279.000.000.000   "}<i
                            className="fas fa-circle fa-xs"></i></span>
                        
                            <b>{"   24h Volume : "}</b> <span className='text'>{"$279.000.000.000   "}<i
                            className="fas fa-circle fa-xs"></i></span>
                        
                            <b>{"   Dash Dominance : "}</b><span className='text'>55.3%</span>
                        </span>
                        {/* </span>
                    <span className='head-right flex-row'> */}
                        <span className=" head-right flex-row head-item pointed"
                              onClick={() => {

                                  themeServices.setTheme({dark: theme && theme.dark == true ? false : true})
                              }}
                        >
                            {
                                theme && theme.dark ? <i
                                    className="fas fa-lightbulb"></i> : <i className="fas fa-moon"></i>
                            }
                        </span>
                        {
                            headItems.map((o, i) => {
                                return (
                                    <span key={i} className='head-item pointed'>
                                        {
                                            o.label ? o.label : o.comp
                                        }
                                    </span>
                                )
                            })
                        }
                    </span>

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
                                    <Link key={i} to={o.to} className={classnames('drr', {'act': i == 0})}>
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