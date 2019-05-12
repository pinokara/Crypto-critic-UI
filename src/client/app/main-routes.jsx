import React, {Fragment} from "react";
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import {BaseComponent} from "./common/base-comp";
import {userServices} from "./services/user-info";
import {HomePage} from "./home-page/home-page";
import {CoinPage} from "./coin-page/coin-page";
import {countryServices} from "./services/country-info";
import {themeServices} from "./services/theme-info";
import classnames from 'classnames'
let redirect = (locate) => {
    return class RedirectRoute extends BaseComponent {
        constructor(props, context) {
            super(props, context);
            props.history.push(locate);

        }

        render() {

            return null;
        }
    }
};


export class MainRoutes extends BaseComponent {
    constructor(props,context) {
        super(props,context);
        this.state={
        }
        this.onUnmount(userServices.onChange(() => this.forceUpdate()));
        this.onUnmount(countryServices.onChange(() => this.forceUpdate()));
        this.onUnmount(themeServices.onChange(() => this.forceUpdate()));
    }


    render() {

        let token =localStorage.getItem("token") ;
        let authenRoute = (Comp) => token ? Comp : redirect("/manage/login");
        let unAuthenRoute = (Comp) => !token ? Comp : redirect("/manage");
        const requireAdmin = (comp) => {
            if (!token) {
                return redirect("/manage/login");
            }
            let user = JSON.parse(localStorage.getItem("user-info") )
            if (user.isAdmin) {
                return comp;
            }
            return redirect("/")
        };


        let theme = themeServices.getTheme() ;

        return (
            <div className={classnames("main-routes" ,{'dark':theme && theme.dark})}>
                <BrowserRouter>
                    <Switch>
                        <Route  path="/" exact component={HomePage}/>
                        <Route  path="/coin/:id" exact component={CoinPage}/>
                        <Route exact render={()=><Redirect to="/" />}/>

                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}