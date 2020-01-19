import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;

      case false:
        return (
          <li>
            <a href="/auth/google">Log in with Google</a>
          </li>
        );

      default:
        return (
          <div>
            <li>
              <Link to={"/surveys"}>Dashboard</Link>
            </li>
            <li>
              <a href="/auth/logout">Logout</a>
            </li>
          </div>
        );
    }
  }
  render() {
    return (
      <nav>
        <div className="navbar-fixed">
          <div className="nav-wrapper light-blue lighten-3">
            <Link to={"/"} className="brand-logo">
              Emaily
            </Link>

            <ul id="nav-mobile" className="right">
              {this.renderContent()}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
