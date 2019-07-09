import React from "react";
import {security} from "../../../security/secuiry-fe";
import {Link} from "react-router-dom";

export class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            submitting: false,
            error: false
        };
    };

    handleOnSubmit(e) {
        this.setState({submitting: true, error: false});
        e.preventDefault();
        e.stopPropagation();
        const {username, password} = this.state;
        // userApi.login({username, password}).then((data) =>{
        //     this.props.history.push("/manage")
        // },()=>{
        //     this.setState({error: true, submitting: false})
        // })

        security.login({username : username, password : password}).then((data) => {
            console.log(data)
            this.props.history.push(`/`)
        },)

    }

    render() {
        let {username, password, submitting, error} = this.state;

        return (
            <div className="login">
                <h1>Login</h1>
                {error && (
                    <div className="error-login">
                        Sai tài khoản hoặc mật khẩu
                    </div>
                )}
                <form onSubmit={(e) => this.handleOnSubmit(e)}>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    value={this.state.username}
                                    onChange={(e) => this.setState({username: e.target.value})}
                                    autoComplete='true'
                                    placeholder="Username"/>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="form-group">
                                <input
                                    type="password"
                                    className="form-control"
                                    value={this.state.password}
                                    autoComplete='true'
                                    onChange={(e) => this.setState({password: e.target.value})}
                                    placeholder="Password"/>
                            </div>
                        </div>
                    </div>
                    <div style={{'paddingBottom': 20}}>
                        <button
                            disabled={submitting}
                            type="submit" className="submit-btn btn"
                        >
                            Login
                        </button>
                    </div>

                    <Link to="/register">
                        Register now !
                    </Link>
                </form>

            </div>
        );
    }
}