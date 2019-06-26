import React from "react";

export class SearchExp extends React.Component{
    constructor(props){
        super(props);
        this.state={
            displayDropdown: false,
            value: ''
        };
    };

    componentWillMount(){
        document.addEventListener('mousedown',this.handleClickArea,false);
    }
    componentWillUnmount(){
        document.removeEventListener('mousedown',this.handleClickArea,false);
    }
    handleClickArea=(e)=>{
        if(this.txs.contains(e.target)){
            return ;
        }else{
            this.setState({ value : ''})
        }
    }

    render(){
        const {displayDropdown,value} =this.state;
        const { list =null,displayItemsAs=null} = this.props;
        return(
            <div
                ref={txs =>  this.txs = txs }
                className='txs-search'>
                <i className="fas fa-search"></i>
                {value.length>0 &&(
                    <div className='close-cover'>
                        <i className="far fa-times-circle"
                           onClick={()=>{
                               setTimeout(()=>{
                                   this.setState({value :''})
                               },100)
                           }}
                        ></i>
                    </div>
                )}

                <input
                    placeholder='Search all assets...'
                    value={value}
                    onChange={(e) => this.setState({ value : e.target.value})}
                    className='txs-input' type="text"
                />
                {
                    value.length >0 && (
                        <div className='dropdown-content flex-column'>
                            {
                                list && list.filter(o => o.name.toLowerCase().includes(value.toLowerCase())
                                    || o.symbol.toLowerCase().includes(value.toLowerCase())).map((o, i) =>   {
                                    return <div
                                        // onClick={()=>onChange(o)}
                                        key={i} className='item'>
                                        {displayItemsAs && displayItemsAs(o)}
                                    </div>
                                })
                            }
                        </div>
                    )
                }
            </div>
        );
    }
}