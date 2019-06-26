import React from "react";
import {Pagination} from "../../component/pagination-table/pagination/pagination";

export class TransactionsList extends React.Component{
    constructor(props){
        super(props);
        this.state={
            page :1
        };
    };
    render(){
        const {page} =this.state;
        const {txs,props,perPage} =this.props ;
        return(
            <div className='transactions-list'>
                <h3>
                    Transactions List:
                </h3>
                {
                    txs && txs.slice((page-1)*10, page*10).map((o,i)=>(
                        <TransactionInfo
                            tx={o}
                            key={i}
                            props={{...props}}
                        />
                        )
                    )
                }
                {
                     txs && txs.length==0 ? (<div style={{"textAlign" :"left"}}>No result</div>) :
                         txs.length > perPage ?
                        <Pagination
                            total={txs.length}
                            pageNum={this.state.page}
                            perPage={10}
                            onChangePage={(page)=> this.setState({page: page})}
                        /> : null
                }
            </div>
        );
    }
}

const TransactionInfo =({tx,props})=>(
    <div className='transaction-info'>
        <div className='tran-id'>
            {tx.txId}
        </div>
        <div className='trade-info flex-row'>
            <div className='tran-in'>
                <span className='label'>Address In(s):</span>
                {tx.vin.length >0 && tx.vin.map((o,i)=>{
                    return(
                        <div className='address' key={i}
                             // onClick={()=> o.relatedVout && props.history.push(`/address/${o.relatedVout.address}`)}
                        >
                            <a href={`${o.relatedVout ? `/address/${o.relatedVout.address}` :'#'}  `}>
                                {o.coinbase ? "Coinbase" : o.relatedVout.address}
                            </a>
                        </div>
                    )
                })}
            </div>
            <div className="tran-out">
                <span className='label'>Address Out(s):</span>
                {tx.vout.length >0 && tx.vout.map((o,i) =>{
                    return(
                        <div className='vout flex-row' key={i}>
                            <div className='address'
                                 // onClick={()=> props.history.push(`/address/${o.address}`)}
                            >
                                <a href={`/address/${o.address}`}>
                                    {o.address}
                                </a>

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