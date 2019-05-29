import React from "react";
import {AppLayout} from "../component/app-layout/app-layout";
import {PaginationTable} from "../component/pagination-table/pagination-table";

export class BlockPage extends React.Component{
    constructor(props){
        super(props);
        this.state={
        };
    };
    render(){
        let list=[
            {
                a :'eaba575c80...',
                b:0,
                c : 0.197,
                d:'XiXLh1eM86uQXitE6iQSzF5UKSWZyfppsJ: 1.00001',
                e :'XpEMFdQowQbTpa8Q1VMW78DHqAQZsvb8nq: 1.5535367',
            }
        ]

        let columns=[
            {
                label:'Transaction',
                renderCell:(item)=> <div className='cell'>
                    <a href="#">
                        {item.a}
                    </a>
                </div>,
                classNames: 'mid'
            },
            {
                label:'Fee',
                renderCell:(item)=> <div className='cell'>
                    {item.b}
                </div>,
                classNames: 'mid'
            },
            {
                label:'Size (kB)',
                renderCell:(item)=> <div className='cell'>
                    {item.c}
                </div>,
                classNames: 'mid'
            },
            {
                label:'From (amount)',
                renderCell:(item)=> <div className='cell'>
                    {item.d}
                </div>,
                classNames: 'mid'

            },
            {
                label:'To (amount)',
                renderCell:(item)=> <div className='cell'>
                    {item.e}
                </div>,
                classNames: 'mid'
            }
        ]
        return(
            <AppLayout
                props={{...this.props}}
                mainChild={()=>
                    <div className='block-page'>
                        <pre>
                            Hash: 0000000000000017b9bfea30c15feaeb34d835e70691b944cf0014c72ce46407 <br/>
                            Previous Block: 000000000000001d6955ea76f2a62783e88ef83fb1c9a1ea6c1aeef62f5b51aa <br/>
                            Next Block: 0000000000000011a597707d164eae6de6812e3c31b158ebc424736cdb267669 <br/>
                            Height: 1075383 <br/>
                            Version: 536870928 <br/>
                            Transaction Merkle Root: cdc0e98e924330371bc15ae2ef2614a869e0c18103e6cdff956cbbe63be6edb2 <br/>
                            Time: 1558683850 (2019-05-24 09:44:10) <br/>
                            Difficulty: 125 467 414.000 (Bits: 19223b53) <br/>
                            Cumulative Difficulty: 23 271 074 323 395.176 <br/>
                            Nonce: 2601186954 <br/>
                            Transactions: 21 <br/>
                            Value out: 1742.80784041 <br/>
                            Transaction Fees: 0.00044665 <br/>
                            Average Coin Age: 506.946 days <br/>
                            Coin-days Destroyed: 926.73755404 <br/>
                            Cumulative Coin-days Destroyed: 65.1329% <br/>
                        </pre>

                        <PaginationTable
                            perPage={20}
                            colums={columns}
                            list={[...Array(20)].map(o => list[0])}
                        />

                    </div>
                }
            />
        );
    }
}