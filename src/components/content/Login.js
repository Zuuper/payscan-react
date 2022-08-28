import React from 'react';
import { Redirect } from "react-router-dom";
import Logo from '../../assets/logo.png'
import '../css/login.css'
import LoginService from '../../services/LoginService'
import UserService from '../../services/UserService'


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            loginParams: { email: '', password: '' },
            googleRecaptaKey : "6LfScz8bAAAAAC26RlJygoyC7vcGdOhqtQ75FfRi"
        }
    }
    handleFormChange = event => {
        let LoginParamsNew = { ...this.state.loginParams }
        let val = event.target.value
        LoginParamsNew[event.target.name] = val
        this.setState({
            loginParams: LoginParamsNew
        })
    }

    login = event => {
        event.preventDefault()
        let email = this.state.loginParams.email
        let password = this.state.loginParams.password
        let data = {
            'email': email,
            'password' : password
        }

        LoginService.postData(data).then((res)=>{
            let access_token = "Bearer " + res.data.access_token
            
            if(access_token){
                this.setState({
                    isLoggedIn: true
                })
                window.grecaptcha.ready(function() {
                    window.grecaptcha.execute('6LfScz8bAAAAAC26RlJygoyC7vcGdOhqtQ75FfRi', {action: 'submit'}).then(function(token) {
                        sessionStorage.setItem('token',access_token)
                        UserService.getAll().then((res) => {
                            sessionStorage.setItem('id_pegawai',res.data.id_pegawai)
                            sessionStorage.setItem('id_toko',res.data.id_toko)
                            sessionStorage.setItem('nama_pegawai', res.data.nama_pegawai)
                        }).catch((err) => {
                            alert(err.response.data.message)
                        })
                        window.location.reload();
                    });
                  });
            }
        }).catch((err) => {
            alert(err.response.data.message)
        })
    }
    render() {
        if (sessionStorage.getItem('token')) {
            return <Redirect to="/dashboard/report" />
        }
        return (
            <main class="container-fluid">
                <div class="row vh-100">
                    <div class="col-4 d-flex justify-content-center align-items-center">
                        <div id="login-form" class="mb-5">
                            <div>
                                <img src={Logo} alt="Payscan Logo" class="mx-auto d-block" />
                                <h1 class="display-4 my-4 text-primary text-center" style={{fontSize: '2.5rem'}}>Welcome Back</h1>
                            </div>
                            <form onSubmit={this.login}>
                                <div class="mt-5">
                                    <div class="mb-3 pt-2">
                                        <label for="usernameInput" class="form-label mb-0">Username</label>
                                        <input
                                            type="email"
                                            class="form-control"
                                            id="EmailInput"
                                            placeholder="Email"
                                            name="email"
                                            onChange={this.handleFormChange}
                                            required
                                        />
                                    </div>
                                    <div class="mb-3">
                                        <label for="passwordInput" class="form-label mb-0">password</label>
                                        <input
                                            type="password"
                                            class="form-control"
                                            id="passwordInput"
                                            placeholder="password"
                                            onChange={this.handleFormChange}
                                            name="password"
                                            required
                                        />
                                    </div>
                                    <div class="">
                                        <div class="mb-3 d-flex justify-content-start ml-4">
                                            <input
                                                type="checkbox"
                                                class="form-check-input"
                                                id="notRobot"
                                                placeholder="notRobot"
                                                name="notRobot"
                                                required
                                            />
                                            <label for="notRobot" class="form-check-label mb-0">Am I a Robot ?</label>
                                        </div>
                                    </div>
                                    </div>
                                <div class="mt-5">
                                    <input type="submit" class="btn btn-primary btn-block mb-3" value="login" data-action='submit'/>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div id="image-login" class="col-8 bg-primary"></div>
                </div>
            </main>
        )
    }
}

export default Login;