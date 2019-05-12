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
export class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: null,
            votes:null
        };
        this.loadData();

    };
    loadData(){
        cryptoApi.getMarket().then(data =>{
            this.setState({list: data})
        })
        voteApi.getVotes().then(data=>{
            this.setState({
                votes: data
            })
        })
    }
    formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
    });
    isNegativeNum = (num) => num < 0 ? "down" : 'up'
    handleVote(id=null){
        console.log(id)
        voteApi.voteCoin(id).then(data =>{
            if(!data.error) this.loadData()
        })
    }
    convertColumns=(country={}, votes={})=>{
        return [
            {
                label :'Vote',
                renderCell :(item)=>
                    <div
                        className='cell vote'
                        onClick={()=>{
                            console.log(item)
                            this.handleVote(item.id)
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
                                <img src={item.image} width='25px' alt=""/>
                            </div>
                            <div className='info'>
                                <b>{item.name}</b>
                            </div>

                        </div>
                    </Link>
                ,
                classNames: 'left'
            },
            {
                label: languages[country.code].coins_table[1],
                renderCell: (item) => <div className='cell price'>{this.formatter.format(item.current_price)}</div>,
                classNames: 'right'
            },
            {
                label: languages[country.code].coins_table[2],
                renderCell: (item) => <div className='cell percent'>
                <span className={this.isNegativeNum(item.price_change_percentage_1h_in_currency)}>
                    {item.price_change_percentage_1h_in_currency.toFixed(1)}%
                </span>
                </div>,
                classNames: 'mid'
            },
            {
                label: languages[country.code].coins_table[3],
                renderCell: (item) => <div className='cell percent'><span
                    className={this.isNegativeNum(item.price_change_percentage_24h_in_currency)}>
                {item.price_change_percentage_24h_in_currency.toFixed(1)}%</span></div>,
                classNames: 'mid'
            },
            {
                label: languages[country.code].coins_table[4],
                renderCell: (item) => <div className='cell percent'><span
                    className={this.isNegativeNum(item.price_change_percentage_7d_in_currency)}>
                {item.price_change_percentage_7d_in_currency.toFixed(1)}%</span></div>,
                classNames: 'mid'
            },
            {
                label: languages[country.code].coins_table[5],
                renderCell: (item) => <div
                    className='cell price'>{this.formatter.format(Math.floor(item.total_volume))}</div>,
                classNames: 'right'
            },
            {
                label: languages[country.code].coins_table[6],
                renderCell: (item) => <div className='cell'>{this.formatter.format(Math.floor(item.market_cap))}</div>,
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
        const {list, votes} = this.state;
        console.log(votes)
        let country = countryServices.getCountry() || {code :'us', flag:'en.svg' ,name:'United State'} ;
        console.log(country)
        return (
            <AppLayout
                props={{...this.props}}
                mainChild={()=>
                    <div className='home-page'>
                    {
                        (!list || !votes )? <LoadingPanel/> :
                            <PaginationTable
                                colums={this.convertColumns(country ,votes)}
                                list={list}
                            />
                    }
                    </div>
                }
            />
        );
    }
}
