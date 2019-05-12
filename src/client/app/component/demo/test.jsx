import React from "react";
import {api} from "../../../api/api";
import {PaginationTable} from "../pagination-table/pagination-table";
import {LoadingPanel} from "../../common/loading/loading-panel/loading-panel";
// import { formatCurrency } from "@coingecko/cryptoformat";
import {clientSocket} from "../../../client-socket"
import io from 'socket.io-client'
import {ChartChart} from "./chart-test";
export class Test extends React.Component{
    constructor(props){
        super(props);
        this.state={
            list:null
        };

        api.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=true&price_change_percentage=1h,24h,7d')
            .then(data => this.setState({list :data}))

    };
    formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
    });

    isNegativeNum=(num)=> num <0 ? "down" :'up'
    colums=[
        {
            label:'Coin',
            renderCell:(item)=>
                <div className='cell name'>
                    <div className='img-cover'>
                        <img src={item.image} width='25px' alt=""/>
                    </div>
                    <div className='info'>
                        <b>{item.name}</b>
                    </div>
                </div>,
            classNames:'left'
        },
        {
            label:'Price',
            renderCell:(item)=> <div className='cell price'>{this.formatter.format(item.current_price)}</div>,
            classNames :'right'
        },
        {
            label:'1h',
            renderCell:(item)=> <div className='cell percent'>
                <span className={this.isNegativeNum(item.price_change_percentage_1h_in_currency)}>
                    {item.price_change_percentage_1h_in_currency.toFixed(1)}%
                </span>
            </div>,
            classNames :'mid'
        },
        {
            label:'24h',
            renderCell:(item)=> <div className='cell percent'><span className={this.isNegativeNum(item.price_change_percentage_24h_in_currency)}>
                {item.price_change_percentage_24h_in_currency.toFixed(1)}%</span></div>,
            classNames :'mid'
        },
        {
            label:'7d',
            renderCell:(item)=> <div className='cell percent'><span className={this.isNegativeNum(item.price_change_percentage_7d_in_currency)}>
                {item.price_change_percentage_7d_in_currency.toFixed(1)}%</span></div>,
            classNames :'mid'
        },
        {
            label:'24h Volume',
            renderCell:(item)=> <div className='cell price'>{this.formatter.format(Math.floor(item.total_volume))}</div>,
            classNames :'right'
        },
        {
            label:'Market Cap',
            renderCell:(item)=> <div className='cell'>{this.formatter.format(Math.floor(item.market_cap))}</div>,
            classNames :'right'
        },
        {
            label :"Chart",
            renderCell:(item) =>  <ChartChart series={this.modeSeries(item.sparkline_in_7d.price)}/>,
            // renderCell:(item) => <ChartChart series={this.modeSeries(item.sparkline_in_7d.price)}/>,
            classNames:'mid'
        }
    ]


    modeSeries=(price)=>{
        return [{ name :'serie', data : price}]
    }

    componentDidMount(){
        // var socket = io.connect('http://localhost:5000');
        // socket.on('test', function (data) {
        //     console.log(data);
        //     // socket.emit('my other event', { my: 'data' });
        // });
    }
    render(){
        const {list} =this.state
        console.log( list)
        return(
            <div className='test'>
                {
                    !list ? <LoadingPanel/> :
                            <PaginationTable
                                colums={this.colums}
                                list={list}
                            />
                }


                {/*<svg className='line-chart'>*/}

                {/*</svg>*/}
            </div>
        );
    }
}



class ChartTest extends React.Component{
    constructor(props){
        super(props);
        this.state={
        };
    };
    render(){
        const {price} =this.props;
        // const points=[[0,80],[20,60],[40,80],[60,20]]
        return(
            <div>
                <svg  viewBox="0 0 110 110" className="chart">
                    <polyline
                        fill="none"
                        stroke="#0074d9"
                        strokeWidth="2"
                        points="
                           00,120
                           20,60
                           40,80
                           60,20
                           80,80
                           100,80
                           120,60
                           140,100
                           160,90
                           180,80
                           200, 110
                           220, 10
                           240, 70
                           260, 100
                           280, 100
                           300, 40
                           320, 0
                           340, 100
                           360, 100
                           380, 120
                           400, 60
                           420, 70
                           440, 80
                         "
                    />

                </svg>
            </div>
        );
    }
}

