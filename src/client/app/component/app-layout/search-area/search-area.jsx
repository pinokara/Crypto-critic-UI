import React from "react";

export class SearchArea extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: '',
            display: false
        }
    }

    render() {
        const {display, value,renItem} = this.state;
        return (
            <div className='search-area'>
                <input type="text"
                       value={this.state.value}
                       onChange={(e) => {
                           this.setState({value: e.target.value})
                       }}
                       // onFocus={() => this.setState({display: true})}
                       // onBlur={() => this.setState({display: false})}
                       className='input-search'/>

                {
                    value.length>0 && (
                        <div className='dropdown-content'>
                            hahah
                        </div>
                    )
                }
            </div>
        )
    }
}