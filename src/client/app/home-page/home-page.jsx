import React from "react";
import {AppLayout} from "../component/app-layout/app-layout";
import {PaginationTable} from "../component/pagination-table/pagination-table";
import {LoadingPanel} from "../common/loading/loading-panel/loading-panel";
import {api} from "../../api/api";
import {SmallLineChart} from "../component/small-line-chart/small-line-chart";
import {Link} from "react-router-dom";
import {languages} from '../mutil-languages'
import {countryServices} from "../services/country-info";
import {voteApi} from "../../api/vote-api/vote-api";
import {cryptoApi} from "../../api/crypto-api/crypto-api";
import {SwitchTabs} from "../component/switch-tabs/switch-tabs";
import {SelectOption} from "../common/select-option/select-option";
import {coinsList} from "../../../assets/cryto-data/coins-list";
import {SearchExp} from "./search-exp/search-exp";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
});

export class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: null,
            votes: null,
            voting: false,
            searchKey: ''
        };
        this.loadMarket();
        this.loadVotes()

    };

    loadMarket() {
        cryptoApi.getMarket().then(data => {
            this.setState({list: data})
        })
    }

    loadVotes(st = {}) {
        voteApi.getVotes().then(data => {
            this.setState({
                votes: data,
                ...st
            })
        })
    }


    isNegativeNum = (num) => num < 0 ? "down" : 'up'

    handleVote(id = null) {
        const {voting, votes} = this.state;
        if(voting) return ;
        else{
            this.setState({voting: true})
            console.log(id)
            voteApi.voteCoin(id).then(data => {
                console.log(data);
                let newVotes={};
                if (!data.error) {
                    for(let i in votes){
                        newVotes[i] = votes[i] ;
                        if(i == data.stat.coinId){
                            newVotes[i].count = data.stat.count;
                        }else{
                            newVotes[id]= data.stat
                        }
                    }
                    setTimeout(()=>{
                        this.setState({ votes : newVotes , voting:false})
                    },100)
                }
                else this.setState({voting: false})
            })
        }
    }

    convertColumns = (country = {}, votes = {}, voting = false) => {
        return [
            {
                label: 'Vote',
                renderCell: (item) =>
                    <div
                        className='cell vote'
                        onClick={() => {
                            console.log(item)
                            if(voting){
                                return ;
                            }else{
                                setTimeout(()=>{
                                    this.handleVote(item.id)
                                },1000)
                            }

                        }}
                    >
                        <i className="fas fa-thumbs-up"></i>
                        {votes[item.id] ? votes[item.id].count : '...'}
                    </div>
            },
            {
                label: languages[country.code].coins_table[0],
                renderCell: (item) =>
                    <Link to={`/coin/${item.id}`}>
                        <div
                            className='cell name'
                            // onClick={() => this.props.history.push(`/coin/${item.id}`)}
                        >

                            <div className='img-cover'>
                                <img src={`/coins/${item.id}.png`} width='25px' alt=""/>
                            </div>
                            <div className='info'>
                                <b>{item.name}</b>
                            </div>

                        </div>
                    </Link>
                ,
                classNames: 'left'
            },
            // {
            //     label: languages[country.code].coins_table[2],
            //     renderCell: (item) => <div className='cell percent'>
            //     <span className={this.isNegativeNum(item.price_change_percentage_1h_in_currency)}>
            //         {item.price_change_percentage_1h_in_currency.toFixed(1)}%
            //     </span>
            //     </div>,
            //     classNames: 'mid'
            // },
            // {
            //     label: languages[country.code].coins_table[3],
            //     renderCell: (item) => <div className='cell percent'><span
            //         className={this.isNegativeNum(item.price_change_percentage_24h_in_currency)}>
            //     {item.price_change_percentage_24h_in_currency.toFixed(1)}%</span></div>,
            //     classNames: 'mid'
            // },
            {
                label: languages[country.code].coins_table[4],
                renderCell: (item) => <div className='cell percent'><span
                    className={this.isNegativeNum(item.price_change_percentage_7d_in_currency)}>
                {item.price_change_percentage_7d_in_currency ? item.price_change_percentage_7d_in_currency.toFixed(1) : 'NAN'}%</span>
                </div>,
                classNames: 'mid'
            },
            {
                label: languages[country.code].coins_table[1],
                renderCell: (item) => <div className='cell price'>{formatter.format(item.current_price)}</div>,
                classNames: 'right'
            },
            {
                label: languages[country.code].coins_table[5],
                renderCell: (item) => <div
                    className='cell price'>{formatter.format(Math.floor(item.total_volume))}</div>,
                classNames: 'right'
            },
            {
                label: languages[country.code].coins_table[6],
                renderCell: (item) => <div className='cell'>{formatter.format(Math.floor(item.market_cap))}</div>,
                classNames: 'right'
            },
            {
                label: languages[country.code].coins_table[7],
                renderCell: (item) => <SmallLineChart data={item.sparkline_in_7d.price}/>,
                // renderCell:(item) => <ChartChart series={this.modeSeries(item.sparkline_in_7d.price)}/>,
                classNames: 'mid'
            }
        ]
    }


    modeSeries = (price) => {
        return [{name: 'serie', data: price}]
    }

    componentDidMount() {
        // var socket = io.connect('http://localhost:5000');
        // socket.on('test', function (data) {
        //     console.log(data);
        //     // socket.emit('my other event', { my: 'data' });
        // });
    }

    render() {
        const {list, votes, voting, searchKey} = this.state;
        let country = countryServices.getCountry() || {code: 'us', flag: 'en.svg', name: 'United State'};

        let tabs = [
            {
                label: 'Master Node',
                renComp: () => <LoadingPanel/>
            },
            {
                label: 'All',
                renComp: () => (!list || !votes) ? <LoadingPanel/> :
                    <PaginationTable
                        perPage={10}
                        colums={this.convertColumns(country, votes, voting)}
                        list={list}
                    />
            },
            {
                label: 'IEO',
                renComp: () => <div className='ieo-tab text-center'>
                    IEO
                </div>
            },
            {
                label: 'New Project',
                renComp: () => <div className='new-project-tab text-center'>
                    New Project
                </div>
            }
        ]
        return (
            <AppLayout
                props={{...this.props}}
                mainChild={() =>
                    <div className='home-page'>

                        <div className='cards flex-row'>
                            {
                                list && [...Array(3)].map((o, i) => {
                                    return (
                                        <InfoCard
                                            key={i}
                                            label='Top Volume'
                                            name={list[i].name}
                                            volume={list[i].total_volume}
                                            price={list[i].current_price}

                                        />
                                    )
                                })
                            }
                        </div>


                        <SwitchTabs
                            tabs={tabs}
                            defaultTab={1}
                            extComp={() => <SearchExp
                                list={coinsList}
                                displayItemsAs={(val)=> (
                                    <div
                                        onClick={()=> this.props.history.push(`/coin/${val.id}`)}
                                        className='flex-row'>
                                        <img style={{marginRight:5 }} height='30px' src={`/coins/${val.image}`} alt=""/>
                                        <span>{val.name}</span>
                                    </div>
                                )}
                            />}
                        />
                    </div>
                }
            />
        );
    }
}


// class InfoCard extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {};
//     };

//     render() {
//         const {label, name, price, volume, classes} = this.props;
//         return (
//             <Card className={classes.card}>
//                 <CardActionArea>   
//                     <div className='info-card text-center flex-column'>
//                         <h3 className='label'>{label}</h3>
//                         <div className='name'>{name}</div>
//                         <div className='volume'>{formatter.format(volume)}</div>
//                         <h4 className='price'>{formatter.format(price)}</h4>
//                     </div>
//                 </CardActionArea>
//             </Card>
//         );
//     }
// }


const useStyles = makeStyles({
  card: {
    color: '#22222',
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export default function InfoCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.card} className='info-card text-center flex-column'>
      {/* <CardActionArea> */}
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.label}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.price}
          </Typography>
        </CardContent>
      {/* </CardActionArea> */}
    </Card>
  );
}