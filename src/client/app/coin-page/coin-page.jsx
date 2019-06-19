import React, {Fragment} from "react";
import {AppLayout} from "../component/app-layout/app-layout";
import {cryptoApi} from "../../api/crypto-api/crypto-api";

import {formatter} from "../convert-crypto";
import {LineChart} from "../component/line-chart/line-chart";
import {LoadingPanel} from "../common/loading/loading-panel/loading-panel";
import {countryServices} from "../services/country-info";
import {themeServices} from "../services/theme-info";
import {HighChartLine} from "../component/high-chart-line/high-chart-line";
import {explorerApi} from "../../api/explorer-api/explorer-api";
import {PaginationTable} from "../component/pagination-table/pagination-table";
import moment from 'moment';
// import {DateUtil} from './../../../utils/date-util'
export class CoinPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            coin: null,
            sparkline: null,
            searchKey: '',
            blockInfo: null,
            displayBlockInfo :false
        };
        this.id = this.props.match.params.id;

        cryptoApi.getCoin(this.id).then(data => {
            console.log(data)
            this.setState({coin: data})
        })
        cryptoApi.getChart(this.id, 'max').then(data => {
            console.log(data);
            this.setState({sparkline: data})
        })
    };


    componentDidMount() {

    }

    onSearchExplorer(txid) {
        const {searchKey} = this.state;
        if(!searchKey || searchKey.length <1){
            this.setState({blockInfo :null})
        }else{
            explorerApi.getBlock('award',searchKey).then(data => {
                console.log(data);
                this.setState({blockInfo: data })
            })
        }

    }

    render() {
        const {match} = this.props;
        let country = countryServices.getCountry();
        let theme = themeServices.getTheme();
        let {id} = match.params;
        const {coin, sparkline, searchKey, blockInfo,displayBlockInfo} = this.state;
        var overview=[
            {
                left:()=> <div><i className="fas fa-signal"></i> Volume:</div>,
                right: ({sparkline, name}) => <div>{formatter.format(sparkline.total_volumes[sparkline.total_volumes.length -1][1])}</div>
            },
            {
                left:() => <div><i className="fas fa-hand-holding-usd"></i> Market:</div>,
                right:({sparkline, name}) => <div>{formatter.format(sparkline.market_caps[sparkline.market_caps.length -1 ][1])}</div>
            },
            {
                left: () => <div><i className="fas fa-exchange-alt"></i> ROI:</div>,
                right :() => <div>6.60%</div>
            },
            {
                left: ()=> <div><i className="fas fa-sticky-note"></i> Nodes:</div>,
                right : () => <div>2,391</div>
            },
            {
                left: () =><div><i className="fas fa-check"></i> Collatetal:</div>,
                right : ({sparkline, name}) => <div>1,000 {name.toUpperCase()}</div>
            },
            {
                left: () => <div><i className="fas fa-check"></i> MN Worth</div>,
                right : ({sparkline, name}) => <div>........</div>
            },

        ]
        return (
            <AppLayout
                props={{...this.props}}
                mainChild={() =>
                    <div
                        className='coin-page'
                    >
                        <div className='coin-main flex-row'>

                            <div className='coin-left flex-column'>
                                {
                                    !coin ? <LoadingPanel/> :
                                        <div className='left-info'>
                                            <span className='rank'># Rank 1</span>
                                            <div className='image-wrap'>
                                                <img width='180px' height='180px' src={`/coins/${coin.id}.png`}
                                                     alt={coin.name}/>
                                            </div>
                                            <h2 className='price text-center'>
                                                {formatter.format(coin.tickers[4].last)}
                                            </h2>
                                            <div className='name text-center'>
                                                {coin.name}
                                            </div>
                                            <div
                                                className='summary'
                                            >
                                                <h5>Overview:</h5>

                                                <div className='flex-column'>
                                                        {
                                                            sparkline && overview.map((o,i)=>(
                                                                <div key={i} className='ov-row'>
                                                                    <div className='on-left'>
                                                                        {o.left()}
                                                                    </div>
                                                                    <div className='on-right'>
                                                                        {o.right({sparkline ,name: coin.name})}
                                                                    </div>
                                                                </div>
                                                            ))
                                                        }
                                                    </div>
                                                </div>


                                        </div>
                                }
                                <ExternalsLink/>
                            </div>
                            <div className='coin-right'>
                                {
                                    (!coin || !sparkline) ? <LoadingPanel/> :
                                        <Fragment>
                                            <IncomeSec/>

                                            <div className='txs-search'>
                                                <input
                                                    placeholder='Search transactions, blocks, addresses, ENS...'
                                                    value={searchKey}
                                                    onChange={(e) => {
                                                        let val = e.target.value ;
                                                        this.setState({searchKey: val })
                                                    }}
                                                    className='txs-input' type="text"
                                                />
                                                <button
                                                    onClick={() => this.onSearchExplorer()}
                                                    className='txs-search-btn'>
                                                    Search
                                                </button>
                                            </div>

                                            {
                                                !blockInfo ? <Fragment>
                                                        <MasterNodeStats
                                                            name={coin.name}
                                                        />
                                                        <h2>{coin && coin.name + " Price Chart"}</h2>
                                                        <HighChartLine
                                                            coinId={this.id}
                                                            datas={[sparkline.prices]}
                                                            setNames={[this.id]}
                                                        />
                                                    </Fragment> :
                                                    <BlockInfo
                                                        blockInfo={blockInfo}
                                                    />
                                            }

                                        </Fragment>
                                }

                            </div>


                        </div>


                    </div>
                }
            />
        );
    }
}


const ExternalsLink = (props) => {
    var links=[
        {
            label :()=> <a className='site-link' href='#'><i className="fas fa-home"></i> Website</a>,
        },
        {
            label :()=> <a className='site-link' href='#'><i className="fab fa-bitcoin"></i> Bitcointalk ANN</a>,
        },
        {
            label :()=> <a className='site-link' href='#'><i className="fab fa-github-square"></i> Github</a>,
        },
        {
            label :()=> <a className='site-link' href='#'><i className="fab fa-discord"></i> Discord</a>,
        },
        {
            label :()=> <a className='site-link' href='#'><i className="fab fa-twitter"></i> Twitter</a>,
        },
        {
            label :()=> <a className='site-link' href='#'><i className="fab fa-searchengin"></i> Explorer 1</a>,
        }
    ]
    var markets=[
        {
            label :()=> <a className='site-link' href='#'>Crypto-Bride</a>,
        },
        {
            label :()=> <a className='site-link' href='#'>STEK</a>,
        },
        {
            label :()=> <a className='site-link' href='#'>Bittrex</a>,
        },
        {
            label :()=> <a className='site-link' href='#'>Binance</a>,
        }
    ]
    return(
        <div className='externals-link flex-row'>
            <div className='left-content'>
                <h5>Links</h5>
                <div style={{justifyContent:'start'}} className='flex-column'>
                    {
                        links.map((o,i) =>
                            (<div style={{textAlign :'left'}}  key={i}>{o.label()}</div>)
                        )
                    }
                </div>
            </div>
            <div className='right-content'>
                <h5>Markets</h5>
                <div style={{justifyContent:'start'}} className='flex-column'>
                    {
                        markets.map((o,i) =>
                            (<div style={{textAlign :'left'}} key={i}>{o.label()}</div>)
                        )
                    }
                </div>
            </div>
        </div>
    )
}


class IncomeSec extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    };

    render() {
        let cards = [
            {
                content: <Fragment>
                    <span><b>Annual ROI: </b> 3000%</span>
                    <span><b>Paid Rewards: </b> 1 BTC</span>
                    <span><b>Reward Frequency: </b>2h24m</span>
                    <span><b>Active Nodes: </b> 100 </span>
                </Fragment>
            },
            {
                background: '#0CABF8',
                color: 'white',
                content: <Fragment>
                    <div className='daily text-center flex-column'>
                        <span>DAILY INCOME</span>
                        <span className='big-price'>$68.123</span>
                        <span>0.01 BTC (10 BTC)</span>
                    </div>
                </Fragment>
            },
            {
                background: '#346EF8',
                color: 'white',
                content: <Fragment>
                    <div className='weekly text-center flex-column'>
                        <span>WEEKLY INCOME</span>
                        <span className='big-price'>$68.123</span>
                        <span>0.07 BTC (70 BTC)</span>
                    </div>
                </Fragment>
            },
            {
                background: '#1d3759',
                color: 'white',
                content: <Fragment>
                    <div className='monthly text-center flex-column'>
                        <span>MONTHLY INCOME</span>
                        <span className='big-price'>$2020.23</span>
                        <span>0.3 BTC (300 BTC)</span>
                    </div>
                </Fragment>
            }
        ]

        return (
            <div className='income-sec flex-row'>
                {

                    cards.map((o, i) =>
                        <div style={{background: o.background, color: o.color}} key={i}
                             className='income-card main-background flex-column'>
                            {o.content}
                        </div>
                    )
                }
            </div>
        );
    }
}

var MasterNodeStats = (props) => {
    const stats = [
        {
            label: 'ROI (annual):',
            value: '6.53% / 5590 days'
        },
        {
            label: 'Paid rewards for masternodes:',
            value: '851.6286 DASH'
        },
        {
            label: 'AVG masternode reward frequency:',
            value: '8d 15h 39 20s'
        },
        {
            label: 'Active masternodes:',
            value: '2,319'
        },
        {
            label: 'Supply:',
            value: '8,854.106 DASH'
        },
        {
            label: 'Coin locked:',
            value: '4,759.000 DASH (53,75%)'
        },
        {
            label: 'Required coins for masternode:',
            value: '1,000 DASH'
        },
        {
            label: 'Masternode worth:',
            value: '$148,260.16 /18.58104 BTC'
        }
    ]
    return (
        <Fragment>
            <h2>{props.name && props.name + " Masternode Stats"}</h2>
            <div className='masternode-stats'>
                {
                    stats.map((o, i) => {
                        return (
                            <div key={i} className='stat flex-row'>
                                <div className='left'>{o.label}</div>
                                <div className='right'>{o.value}</div>
                            </div>
                        )
                    })
                }

            </div>
        </Fragment>
    )
}

const BlockInfo = (props) => {
    const {blockInfo} = props;
    let columns =[
        {
            label :'Transaction ID',
            renderCell :(item ) => <a className='cell'>{item.txId}</a>
        },
        {
            label :'Total',
            renderCell:(item) =><div className="cell">{item.vout?item.vout.reduce((u,v) => (u*10+v.value*10)/10 ,0 ) :0}</div>,
            classNames :'right'
        },
        {
            label :'Time',
            renderCell :(item ) => <div className="cell">{ moment(new Date(item.createdAt)).format('MM/DD/YYYY, HH:mm:ss')}</div>,
            classNames :'right'
        }
    ]
    return (
        <div className='block-info'>
            <h2>Block Infomation</h2>
            <div className='info'>
                Hash: {blockInfo.block.hash} <br/>
                Previous Block: {blockInfo.block.prev} <br/>
                Next Block: {blockInfo.block.nextblockhash} <br/>
                Height: {blockInfo.block.height} <br/>
                Version: {blockInfo.block.ver} <br/>
                Transaction Merkle Root: {blockInfo.block.merkle} <br/>
                Difficulty: {blockInfo.block.diff} (Bits {blockInfo.block.bits}) <br/>
                Cumulative Difficulty: 23 271 074 323 395.176 <br/>
                Nonce: {blockInfo.block.nonce} <br/>
                Size : {blockInfo.block.size} <br/>
                Average Coin Age: 506.946 days <br/>
                Coin-days Destroyed: 926.73755404 <br/>
                Cumulative Coin-days Destroyed: 65.1329% <br/>
            </div>
            <h2 className='block-txs-label'>Block's Transactions</h2>
            <div className='txs-list'>
                <PaginationTable
                    perPage={10}
                    colums={columns}
                    list={blockInfo.txs}
                />
            </div>
        </div>
    );
}