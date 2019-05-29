import React from "react";
import {AppHeader} from "./app-header/app-header";
import {InputForm} from "../../common/input-form/input-form";
import {SearchArea} from "./search-area/search-area";
import {coinsList} from "../../../../assets/cryto-data/coins-list";
import {Link} from "react-router-dom";

export class AppLayout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    };

    render() {
        const {mainChild, ...props} = this.props;
        return (
            <div className='app-layout'>
                <AppHeader/>
                <div className='main-son child-cover'>
                    {mainChild()}
                </div>
            </div>
        );
    }
}
