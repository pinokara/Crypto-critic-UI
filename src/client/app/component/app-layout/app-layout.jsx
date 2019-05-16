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
                <div className='search-panel child-cover'>
                    <SearchArea
                        list={coinsList}
                        renItem={(item, index) => <a key={index} href={`/coin/${item.id}`}><div  className='search-item flex-row'>
                            <img width='25' height='25' src={`/coins/${item.id}.png`} alt=""/>
                            <span>{item.name}</span>
                        </div></a>}
                    />
                </div>
                <div className='child-cover'>
                    {mainChild()}
                </div>
            </div>
        );
    }
}
