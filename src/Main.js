import React, { Component } from 'react';
import './components/css/main.css';
import Login from "./components/content/Login";
import Dashboard from "./Dashboard";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
class Main extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <ProtectedRoute path="/dashboard">
                        <Dashboard />
                    </ProtectedRoute>
                    <Route exact path="/">
                        <Redirect exact from="/" to="dashboard/report" />
                    </Route>
                    <Route path="*">
                        <Redirect from="/" to="dashboard/report" />
                    </Route>
                </Switch>
            </Router>
        )
    }
}

export default Main;