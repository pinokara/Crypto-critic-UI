import React from "react";
import {AppHeader2} from "./app-header/app-header-2";

export class AppLayout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    };

    render() {
        const {mainChild, ...props} = this.props;
        return (
            <div className='app-layout'>
                <AppHeader2/>
                <div className='main-son child-cover'>
                    {mainChild()}
                </div>
            </div>
        );
    }
}
