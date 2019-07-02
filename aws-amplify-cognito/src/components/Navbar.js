import React, { Component } from "react";
import Auth from "@aws-amplify/auth";
import { Link, NavLink } from "react-router-dom";

export default class Navbar extends Component {
  handleLogOut = async event => {
    event.preventDefault();
    try {
      Auth.signOut();
      this.props.auth.setAuthStatus(false);
      this.props.auth.setUser(null);
    } catch (error) {
      console.log(error.message);
    }
  };

  render() {
    return (
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <Link className="navbar-item" to="/">
            <img
              src="hexal-logo.png"
              width="112"
              height="28"
              alt="hexal logo"
            />
          </Link>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <NavLink to="/" className="navbar-item">
              Home
            </NavLink>
            <NavLink to="/products" className="navbar-item">
              Products
            </NavLink>
            <NavLink to="/admin" className="navbar-item">
              Admin
            </NavLink>
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              {this.props.auth.isAuthenticated && this.props.auth.user && (
                <p style={{ paddingTop: "5px" }}>
                  Hello {this.props.auth.user.username}
                </p>
              )}
              <div className="buttons">
                {!this.props.auth.isAuthenticated && (
                  <div>
                    <Link to="/register" className="button is-primary">
                      <strong>Register</strong>
                    </Link>
                    <Link to="/login" className="button is-light">
                      Log in
                    </Link>
                  </div>
                )}
                {this.props.auth.isAuthenticated && (
                  <Link
                    to="/"
                    onClick={this.handleLogOut}
                    className="button is-light"
                  >
                    Log out
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}
