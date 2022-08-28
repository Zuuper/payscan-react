import React from 'react';
import '../css/header.css';
import { Redirect } from "react-router-dom";
class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            titleHeader: 'Title',
            username: 'Admin',
            isLoggedOut : false
        }
    }
    signOut = () => {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem('id_toko')
        sessionStorage.removeItem('id_pegawai')
        sessionStorage.removeItem('nama_pegawai')
        this.setState({
            isLoggedOut: true
        });
      };
    render() {
        if (this.state.isLoggedOut) {
            return <Redirect to="/login" />;
          }
        return (
            <div class="container-fluid my-2">
                <div
                    id="page-navbar-name"
                    class="d-flex justify-content-between align-items-center"
                >
                    <h1>{this.props.titleHeader}</h1>
                    <div class="dropdown">
                        <p
                            class="dropdown-toggle"
                            type="button"
                            id="dropdownMenuButton"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                        >
                            Hello, {this.props.username}
                        </p>
                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <button class="dropdown-item" onClick={this.signOut} >Log out</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;