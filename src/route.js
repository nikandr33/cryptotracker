import React from 'react';
import { createHashHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import ReactPixel from "react-facebook-pixel";
import { connect } from "react-redux";

import AuthLayout from "./layouts/Auth/Auth.jsx";
import AdminLayout from "./layouts/Admin/Admin.jsx";

import fire from "./fire.js";


class Rootrouter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null
        }
    }

    componentDidMount() {
        this.authListener();
    }

    authListener() {
        fire.auth().onAuthStateChanged((user) => {
            if(user) {
                this.setState({ user });
            } else {
                this.setState({ user: null });
            }
        });
    }

    render() {
        const hist = createHashHistory();

        ReactPixel.init("111649226022273");
        ReactPixel.pageView();
        ReactPixel.fbq("track", "PageView");

        hist.listen(location => {
            ReactPixel.pageView();
            ReactPixel.fbq("track", "PageView");
        });
        const { auth } = this.props;

        const PrivateRoute = ({ component: Component, ...rest }) => (
            
            <Route
                {...rest}
                render={props =>
                    !auth.isEmpty ? (
                        <Component {...props} />
                    ) : (
                        <Redirect
                        to="/auth/login"
                        />
                    )
                }
            />
        );
    
        const IsAuth = ({ component: Component, ...rest }) => (
            <Route
                {...rest}
                render={props =>
                    !auth.isEmpty ? (
                        <Redirect
                        to="/admin/dashboard"
                        />
                    ) : (
                        <Component {...props} />
                    )
                }
            />
        );

        const NoMatch = ({ location }) => (
            <div className="error-404">
                <h2>404 ERROR</h2>
                <h3>
                    No match for <em>{location.pathname}</em>
                </h3>
            </div>
          );
        
        return (
            <Router history={hist}>
                <Switch>
                    <IsAuth path="/auth" component={AuthLayout} />} />
                    <PrivateRoute path="/admin" component={AdminLayout} />} />
                    <Redirect from="/" to="/admin/dashboard" />
                    <Route path='*' component={NoMatch} />
                </Switch>
            </Router>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}

export default connect(mapStateToProps)(Rootrouter);