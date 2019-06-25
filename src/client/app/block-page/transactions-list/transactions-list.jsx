import React from "react";

export class TransactionsList extends React.Component{
    constructor(props){
        super(props);
        this.state={
        };
    };
    render(){
        const {txs} =this.props ;
        return(
            <div className='transactions-list'>
                <h3>
                    Transactions List:
                </h3>
                {
                    txs && txs.map((o,i)=>(
                        <TransactionInfo
                            tx={o}
                            key={i}
                        />
                        )
                    )
                }
            </div>
        );
    }
}

const TransactionInfo =({tx})=>(
    <div className='transaction-info'>
        <div className='tran-id'>
            {tx.txId}
        </div>
        <div className='trade-info flex-row'>
            <div className='tran-in'>
                <span className='label'>Address In(s):</span>
                {tx.vin.length >0 && tx.vin.map((o,i)=>{
                    return(
                        <div className='address' key={i}>
                            {o.coinbase ? "Coinbase" : o.relatedVout.address}
                        </div>
                    )
                })}
            </div>
            <div className="tran-out">
                <span className='label'>Address Out(s):</span>
                {tx.vout.length >0 && tx.vout.map((o,i) =>{
                    return(
                        <div className='vout flex-row' key={i}>
                            <div className='address' >
                                {o.address}
                            </div>
                            <div className='value'>
                                {o.value}
                            </div>
                        </div>
                    )
                })}
            </div>

        </div>

    </div>
)