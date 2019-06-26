import React from "react";
import {AppLayout} from "../component/app-layout/app-layout";
import {BlockInfo} from "./block-info/block-info";
import {explorerApi} from "../../api/explorer-api/explorer-api";
import {TransactionsList} from "./transactions-list/transactions-list";

export class BlockPage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            blockInfo: null
        };
        explorerApi.getBlock('award',props.match.params.id).then(data =>{
            console.log(data);
            this.setState({ blockInfo : data})
        })
    };
    render(){
        const {blockInfo} =this.state;
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
                mainChild={()=>{
                    if(!blockInfo) return null ;
                    return(
                        <div className='block-page'>
                            <h3>Block Infomation</h3>
                            <BlockInfo
                                blockInfo={blockInfo}
                                props={{...this.props}}

                            />

                            <TransactionsList
                                txs={blockInfo.txs}
                                props={{...this.props}}
                            />

                        </div>
                    )
                }

                }
            />
        );
    }
}