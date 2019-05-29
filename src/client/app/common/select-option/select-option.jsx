import React from "react";

export class SelectOption extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayDropdown: false
        };
    };

    handleClick = (e) => {
        if (this.selectOpt.contains(e.target)) {
            return;
        }
        this.setState({
            displayDropdown: false
        })
    }

    componentWillMount() {
        document.addEventListener('mousedown', this.handleClick, false);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClick, false);
    }

    render() {
        const {width = 180, height = 30,onChange, placeholder = null, label = null, value = null, list = null, displayValueAs, displayItemsAs} = this.props;
        const {displayDropdown} = this.state;
        return (
            <div
                ref={selectOpt => this.selectOpt = selectOpt}
                style={{height: height, width: width}}
                onClick={() => this.setState({displayDropdown: !this.state.displayDropdown})}
                className='select-option'>
                {
                    label && (
                        <div className='label'>
                            {label}
                        </div>
                    )
                }

                <div style={{height: height}} className='select-area'>
                    <div style={{height: height-2, lineHeight: (height-2) + "px"}} className='display-value'>
                        {value && displayValueAs(value)}
                    </div>

                    <i className="fas fa-sort-down"></i>
                </div>

                {
                    displayDropdown && (
                        <div className='dropdown-content flex-column'>
                            {
                                list && list.map((o, i) =>   {
                                    return <div
                                        onClick={()=>onChange(o)}
                                        key={i} className='item'>
                                        {displayItemsAs(o)}
                                    </div>
                                })
                            }
                        </div>
                    )
                }
                <div>

                </div>


            </div>
        );
    }
}