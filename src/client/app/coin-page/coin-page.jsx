import React, {Fragment} from "react";
import {AppLayout} from "../component/app-layout/app-layout";
import {cryptoApi} from "../../api/crypto-api/crypto-api";

import {formatter} from "../convert-crypto";
import {LineChart} from "../component/line-chart/line-chart";
import {LoadingPanel} from "../common/loading/loading-panel/loading-panel";
import {countryServices} from "../services/country-info";
import {themeServices} from "../services/theme-info";
import {api} from "../../api/api";
import {HighChartLine} from "../component/high-chart-line/high-chart-line";
import {explorerApi} from "../../api/explorer-api/explorer-api";
import {PaginationTable} from "../component/pagination-table/pagination-table";
import moment from 'moment';
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
        }
        explorerApi.getBlockHeight(searchKey).then(data => {
            console.log(data);
            this.setState({blockInfo: data })
        })
    }

    render() {
        const {match} = this.props;
        let country = countryServices.getCountry();
        let theme = themeServices.getTheme();
        let {id} = match.params;
        const {coin, sparkline, searchKey, blockInfo,displayBlockInfo} = this.state;
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
                                        <Fragment>
                                            <span className='rank'># Rank 1</span>
                                            <div className='image-wrap'>
                                                <img width='180px' height='180px' src={`/coins/${coin.id}.png`}
                                                     alt={coin.name}/>
                                            </div>
                                            <div className='name text-center'>
                                                {coin.name}
                                            </div>
                                            <div
                                                className='summary'
                                            >
                                                <h5>Sumary:</h5>

                                                <div className='flex-column'>
                                                <span><i className="fas fa-tags"></i>
                                                    <b>Price: </b> {coin.tickers[1].last + " BTC " + '(' + formatter.format(coin.tickers[0].last) + ")"}
                                                </span>

                                                    <span>
                                                    <i className="far fa-chart-bar"></i>
                                                    <b>Volume: </b>
                                                        {coin.tickers[0].converted_volume.btc + '(' + formatter.format(coin.tickers[0].converted_volume.usd) + ")"}
                                                </span>

                                                    <span>
                                                    <i className="fas fa-dollar-sign"></i>
                                                    <b>Daily Income: </b>
                                                        {"$680" + " " + "(CCC)"}
                                                </span>

                                                    <span>
                                                    <i className="fab fa-accusoft"></i>
                                                    <b>ROI: </b>
                                                    3,000%
                                                </span>

                                                </div>


                                            </div>
                                        </Fragment>
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
                                                blockInfo ==null ? <Fragment>
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


const ExternalsLink = (props) => (
    <div className='externals-link'>
        <h5>Externals Link</h5>
        <span>
            <i className="fas fa-home"></i>
            <b></b>
        </span>
    </div>
)


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
                    <span><b>Paid Rewards: </b> 1 BLS</span>
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
                        <span>0.01 BTC (10 BLS)</span>
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
                        <span>0.07 BTC (70 BLS)</span>
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
                        <span>0.3 BTC (300 BLS)</span>
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
            renderCell :(item ) => <div className='cell'>{item.txid}</div>
        },
        {
            label :'Total',
            renderCell:(item) =><div className="cell">{item.total}</div>
        },
        {
            label :'Time',
            renderCell :(item ) => <div className="cell">{moment(item.timestamp*1000).format('MM/DD/YYYY, hh:mm:ss')}</div>
        }
    ]
    return (
        <div className='block-info'>
            <h2>Block Infomation</h2>
            <pre>
                Hash: {blockInfo.hash} <br/>
                Previous Block: {blockInfo.previousblockhash} <br/>
                Next Block: {blockInfo.nextblockhash} <br/>
                Height: {blockInfo.height} <br/>
                Version: {blockInfo.version} <br/>
                Transaction Merkle Root: {blockInfo.merkleroot} <br/>
                Time: {blockInfo.time} <br/>
                Difficulty: {blockInfo.difficulty} (Bits {blockInfo.bits}) <br/>
                Cumulative Difficulty: 23 271 074 323 395.176 <br/>
                Nonce: {blockInfo.nonce} <br/>
                Value out: 1742.80784041 <br/>
                Transaction Fees: 0.00044665 <br/>
                Average Coin Age: 506.946 days <br/>
                Coin-days Destroyed: 926.73755404 <br/>
                Cumulative Coin-days Destroyed: 65.1329% <br/>
            </pre>
            <h2>Block's Transactions</h2>
            <PaginationTable
                perPage={10}
                colums={columns}
                list={blockInfo.txs}
            />
        </div>
    );
}