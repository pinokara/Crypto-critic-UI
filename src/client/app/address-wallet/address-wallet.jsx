import React from "react";
import {AppLayout} from "../component/app-layout/app-layout";
import {explorerApi} from "../../api/explorer-api/explorer-api";
import {TransactionsList} from "../block-page/transactions-list/transactions-list";
import {LoadingPanel} from "../common/loading/loading-panel/loading-panel";

export class AddressWallet extends React.Component{
    constructor(props){
        super(props);
        this.state={
            addressInfo:null
        };
        this.addressId = props.match.params.id ;
        explorerApi.getAddress('award', this.addressId).then(data =>{
            console.log(data)
            this.setState({ addressInfo : data})
        })
    };
    render(){
        const {addressInfo} =this.state ;
        return(
            <AppLayout
                props={{...this.props }}
                mainChild={()=>{
                    if( !addressInfo ) return <LoadingPanel/>;
                    return(
                        <div className='address-wallet'>
                            <h3>Address Infomation:</h3>
                            <div className='text'>{this.addressId}</div>
                            <TransactionsList
                                txs={addressInfo.txs.slice(0,29)}
                                props={{...this.props}}
                            />
                        </div>
                    )
                }}
            />
        );
    }
}