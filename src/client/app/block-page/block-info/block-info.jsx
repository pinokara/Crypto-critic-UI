import React from "react";

export class BlockInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    };
    getReward=(txs)=>{
        let reward= 0 ;
        reward = txs.reduce((a , b) =>{
            return (a*10 +  b.vout.reduce((x,y) =>{
               return x+ y.value ;
            },0)*10 )/10
        },0)
        return reward;
    }
    render() {
        const {blockInfo,props} = this.props;
        if (!blockInfo) return null;
        return (
            <div className='block-info'>
                <div className='block flex-row'>
                    <div className='sec-ct'
                         onClick={()=> props.history.push(`/block/${blockInfo.block.height}`)}>
                        <div className='label'
                        >
                            Hash ID
                        </div>

                    </div>
                    <div className="sec-ct"
                         onClick={()=> props.history.push(`/block/${blockInfo.block.height}`)}
                    >
                        <div className='content hash'>
                            {blockInfo.block.hash}
                        </div>
                    </div>
                    <div className="sec-ct">
                        <div className='label'>
                            Confirmations
                        </div>
                        <div className='content'>
                            {blockInfo.block.confirmations}
                        </div>
                    </div>

                    <div className='sec-ct'>
                        <div className='label'>
                            Created At
                        </div>
                        <div className='content'>
                            {blockInfo.block.createdAt}
                        </div>
                    </div>

                    <div className="sec-ct">
                        <div className="label">
                            Block reward
                        </div>
                        <div className="content">
                            {this.getReward(blockInfo.txs)}
                        </div>
                    </div>

                    <div className="sec-ct">
                        <div className="label">
                            Block Height
                        </div>
                        <div className="content">
                            {blockInfo.block.height}
                        </div>
                    </div>
                    <div className="sec-ct">
                        <div className="label">
                            Size
                        </div>
                        <div className="content">
                            {blockInfo.block.size + " KB"}
                        </div>
                    </div>

                    <div className="sec-ct">
                        <div className="label">
                            Difficulty
                        </div>
                        <div className="content">
                            {blockInfo.block.diff}
                        </div>
                    </div>

                </div>


            </div>
        );
    }
}