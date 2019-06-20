import React from "react";
import classnames from 'classnames'
import {
    CSSTransition,
    TransitionGroup,
} from 'react-transition-group';

export class SwitchTabs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tab: props.defaultTab || 0
        };
    };

    render() {
        const {tabs = null, defaultTab = 1, extComp =null} = this.props;
        const {tab} = this.state;
        return (
            <div className='switch-tabs'>
                <div className='tabs-head flex-row'>
                    {
                        tabs && tabs.map((o, i) => {
                            return (
                                <div
                                    onClick={() => {

                                        tab != i && this.setState({tab: i})
                                    }}
                                    key={i} className={classnames('tab-label inline', {'act-tab': i == tab})}>
                                    {o.label}
                                </div>
                            )
                        })
                    }
                </div>
                {
                    extComp && (
                        <div className='fking-comp'>
                            {extComp()}
                        </div>
                    )
                }

                <div className='contain'>
                    {
                        tabs[tab].renComp()
                    }
                </div>

            </div>
        );
    }
}