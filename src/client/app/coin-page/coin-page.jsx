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
export class CoinPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            coin: null,
            sparkline: null
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


    componentDidMount(){

    }
    render() {
        const {match} = this.props;
        let country = countryServices.getCountry();
        let theme = themeServices.getTheme();
        let {id} = match.params;
        const {coin, sparkline} = this.state;
        return (
            <AppLayout
                props={{...this.props}}
                mainChild={() =>
                    <div
                        className='coin-page'
                    >
                        <div>{country ? country.flag:'nothing'}</div>
                        <div>{theme ? theme.dark ? 'dark':'light' :'light'}</div>
                        <div className='coin-head flex-row'>
                            <div className='item name text-center'>
                                CRYPTO CRITIX
                            </div>

                            <div className='item search'>
                                <input
                                    type="text"
                                />
                            </div>
                            <div className='item user'>

                            </div>
                        </div>
                        <div className='coin-main flex-row'>

                            <div className='coin-left flex-column'>
                                {
                                    !coin ? <LoadingPanel/>:
                                    <Fragment>
                                        <div className='image-wrap'>
                                            <img width='180px' height='180px' src={`/coins/${coin.id}.png`} alt={coin.name}/>
                                        </div>
                                        <div className='text-center'>
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
                                                    {"$680" + " " + "(BLS)"}
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
                                            <HighChartLine
                                                coinId={this.id}
                                                datas={[sparkline.prices]}
                                                setNames={[this.id]}
                                            />
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
                label: '1'
            },
            {
                label: '1'
            },
            {
                label: '1'
            },
            {
                label: '1'
            }
        ]

        return (
            <div className='income-sec flex-row'>
                {

                    cards.map((o, i) =>
                        <div key={i} className='income-card main-background'>
                            {o.label}
                        </div>
                    )
                }
            </div>
        );
    }
}

// class CoinPageMain extends React.Component {
//
//     render() {
//         const {coin, sparkline} = this.props;
//         if (!coin) return <LoadingPanel/>
//         return (
//
//         )
//     }
//
// }