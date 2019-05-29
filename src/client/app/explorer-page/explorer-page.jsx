import React from "react";
import {InputForm2} from "../common/input-form/input-form2";
import {AppLayout} from "../component/app-layout/app-layout";
import {PaginationTable} from "../component/pagination-table/pagination-table";

export class ExplorerPage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            block_number : '',
        };
    };
    render(){
        const {block_number} =this.state;
        let list=[
            {
                a :1075391,
                b:'2019-05-24 10:25:51',
                c:104,
                d : 1262.19584785,
                e :88019628.311,
                f :8827523.01733578,
                g: 507,
                h :1951.28,
                i : '65.1297%'
            }


        ]
        let columns=[
            {
                label:'Block',
                renderCell:(item)=> <div className='cell'>
                    <a href="/block/hash">
                        {item.a}
                    </a>
                </div>,
                classNames: 'mid'
            },
            {
                label:'Approx. Time',
                renderCell:(item)=> <div className='cell'>
                    {item.b}
                </div>,
                classNames: 'mid'
            },
            {
                label:'Transactions',
                renderCell:(item)=> <div className='cell'>
                    {item.c}
                </div>,
                classNames: 'right'
            },
            {
                label:'Value Out',
                renderCell:(item)=> <div className='cell'>
                    {item.d}
                </div>,
                classNames: 'right'

            },
            {
                label:'Difficulty',
                renderCell:(item)=> <div className='cell'>
                    {item.e}
                </div>,
                classNames: 'right'
            },
            {
                label:'Outstanding',
                renderCell:(item)=> <div className='cell'>
                    {item.f}
                </div>,
                classNames: 'right'
            },
            {
                label:'Average Age',
                renderCell:(item)=> <div className='cell'>
                    {item.g}
                </div>,
                classNames: 'right'
            },
            {
                label:'Chain Age',
                renderCell:(item)=> <div className='cell'>
                    {item.h}
                </div>,
                classNames: 'right'
            },
            {
                label:'% Coin DD',
                renderCell:(item)=> <div className='cell'>
                    {item.i}
                </div>,
                classNames: 'right'
            },
        ]
        return(
            <AppLayout
                props={{...this.props}}
                mainChild={()=>
                    <div className='explorer-page'>
                        <div className='search-panel flex-row'>
                            <InputForm2
                                style={{
                                    padding :'5px 10px',
                                    width :300 ,
                                    outline: 'none' ,
                                    borderRadius: 5,
                                    border:'1px solid #e3e3e3'
                                }}
                                placeholder='Block Search'
                                type='number'
                                min={0}
                                value={block_number}
                                onChange={(val)=> this.setState({block_number: val})}
                            />
                            <button className='search-btn'>
                                Search
                            </button>
                        </div>

                        <PaginationTable
                            colums={columns}
                            list={[...Array(10)].map(o => list[0])}
                        />

                    </div>
                }
            />

        );
    }
}