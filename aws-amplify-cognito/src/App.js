import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Projects from "./components/Projects";
import LogIn from "./components/auth/LogIn";
import Register from "./components/auth/Register";
import ForgotPassword from "./components/auth/ForgotPassword";
import ForgotPasswordVerification from "./components/auth/ForgotPasswordVerification";
import ChangePassword from "./components/auth/ChangePassword";
import ChangePasswordConfirm from "./components/auth/ChangePasswordConfirm";
import Welcome from "./components/auth/Welcome";
import Footer from "./components/Footer";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import Auth from "@aws-amplify/auth";
import Analytics from "@aws-amplify/analytics";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UnprotectedRoute from "./components/auth/UnprotectedRoute";
import ProjectStatus from "./components/ProjectStatus";
library.add(faEdit);

class App extends Component {
  state = {
    isAuthenticated: false,
    isAuthenticating: true,
    user: null
  };

  setAuthStatus = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  };

  setUser = user => {
    this.setState({ user: user });
  };

  async componentDidMount() {
    try {
      const session = await Auth.currentSession();
      this.setAuthStatus(true);
      console.log(session);
      const user = await Auth.currentAuthenticatedUser();
      this.setUser(user);
    } catch (error) {
      if (error !== "No current user") {
        console.log(error);
      }
    }

    this.setState({ isAuthenticating: false });
  }

  render() {
    Analytics.disable();
    const authProps = {
      isAuthenticated: this.state.isAuthenticated,
      user: this.state.user,
      setAuthStatus: this.setAuthStatus,
      setUser: this.setUser
    };
    console.log(authProps);
    return (
      !this.state.isAuthenticating && (
        <div className="App">
          <Router>
            <div>
              <Navbar auth={authProps} />
              <Switch>
                <UnprotectedRoute
                  exact
                  path="/"
                  component={Home}
                  auth={authProps}
                />
                <UnprotectedRoute
                  exact
                  path="/projects"
                  component={Projects}
                  auth={authProps}
                />
                <Route
                  exact
                  path="/login"
                  render={props => <LogIn {...props} auth={authProps} />}
                />
                <UnprotectedRoute
                  exact
                  path="/register"
                  component={Register}
                  auth={authProps}
                />
                <UnprotectedRoute
                  exact
                  path="/forgotpassword"
                  component={ForgotPassword}
                  auth={authProps}
                />
                <UnprotectedRoute
                  exact
                  path="/forgotpasswordverification"
                  component={ForgotPasswordVerification}
                  auth={authProps}
                />
                <ProtectedRoute
                  exact
                  path="/changepassword"
                  component={ChangePassword}
                  auth={authProps}
                />
                <ProtectedRoute
                  exact
                  path="/changepasswordconfirmation"
                  component={ChangePasswordConfirm}
                  auth={authProps}
                />
                <UnprotectedRoute
                  exact
                  path="/welcome"
                  component={Welcome}
                  auth={authProps}
                />
                <ProtectedRoute
                  exact
                  path="/projectstatus/:project_id"
                  component={ProjectStatus}
                  auth={authProps}
                />
              </Switch>
              <Footer />
            </div>
          </Router>
        </div>
      )
    );
  }
}

export default App;
