import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import './Login.scss';
import { FormattedMessage } from 'react-intl';
import { divide } from 'lodash';
import { Fragment } from 'react';
import { withRouter } from 'react-router';
import { handleLoginApi } from '../../services/userService';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isShowPassword: false,
            errMessage: ''
        }
    }

    handleOnChangeUsername = (event) =>
    {
        this.setState({
            username: event.target.value
        })
    }
    handleOnChangePassword = (event) =>
    {
        this.setState({
            password: event.target.value
        })
    }

    handleLogin = async () =>
    {    
        this.setState({
            errMessage: ''
        })    
        try {
            let data = await handleLoginApi(this.state.username, this.state.password)   
            if (data && data.errCode !== 0)
            {
                this.setState({
                    errMessage:  data.message
                })

            }

            if (data && data.errCode == 0)
            {
                this.props.userLoginSuccess(data.user)
            }
        } catch (error) {
            if (error.response)
            {
                if (error.response.data)
                {
                    this.setState({
                        errMessage: error.response.data.message
                    })
                }
            }   
        }

    }
    handleShowHidePassword = () =>
    {
       this.setState({
        isShowPassword : !this.state.isShowPassword
       })
    }

    handleSwtichSignup = () => {
        this.props.history.push(`/signup`)
    }

    SwitchForgot = () => {
        this.props.history.push(`/forgot`)
    }

    render() {
        // jsx
        return (
            <div className='login-background'>

                
                <div className='img-login'>
                    <div className='img'>
                        
                    </div>
                </div>

                <div className='login-container'>
                    <div className='login-content row'>
                        <div className='col-12 text-login'>Đăng nhập</div>
                        <div className='signup-from-login'>Bạn chưa có tài khoản? <span onClick={() => this.handleSwtichSignup()} style={{fontWeight: '600' , cursor: 'pointer', color: 'blue'}}>Đăng ký</span></div>
                        <div className='col-12 form-group login-input'>
                            <label style={{fontWeight: '600', fontSize: '17px'}}>Email:</label>
                            <input type='text' 
                            className='form-control' 
                            placeholder='Nhập email của bạn'
                            value={this.state.username}
                            onChange= {(event) =>
                            {
                                this.handleOnChangeUsername(event)
                            }}
                            />
                        </div>
                        <div className='col-12 form-group login-input'>
                            <label style={{fontWeight: '600', fontSize: '17px'}}>Mật khẩu:</label>
                            <div className='custom-input-password'>
                                <input 
                                type={this.state.isShowPassword ? 'text' : 'password'} 
                                className='form-control' 
                                placeholder='Nhập mật khẩu của bạn'
                                value={this.state.password}
                                onChange= {(event) =>
                                    {
                                        this.handleOnChangePassword(event)
                                    }}
                                // onKeyDown={this.}
                                />
                                <span onClick={() => this.handleShowHidePassword()}>
                                    <i className= {this.state.isShowPassword ? 'fas fa-eye-slash': 'fas fa-eye'}></i>
                                </span>
                                 
                            </div>
                          
                        </div>
                        <div className='col-12' style={{color: 'red'}}>
                            {this.state.errMessage}
                        </div>
                        <div className='col-12'>
                            <button className='btn-login' onClick={() =>{this.handleLogin()}}>Login</button>
                        </div>
                        <div className='col-12'>
                            <span className='forgot-password' style={{cursor: 'pointer'}}  onClick={() => this.SwitchForgot()}>Quên mật khẩu ?</span>
                        </div>
                        <div className='col-12 text-center mt-3'>
                            <span className='text-other-login' style={{fontWeight: '600'}}>Hoặc đăng nhập:</span>
                        </div>
                        <div className='col-12 social-login'>
                             <i className="fab fa-google-plus-g google"></i>
                             <i className="fab fa-facebook-f facebook"></i>
                        </div>
                    </div>
                </div>


            </div>

        
        )
    }
}


const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        // userLoginFail: () => dispatch(actions.adminLoginFail()),
        userLoginSuccess: (userInfor) => dispatch(actions.userLoginSuccess(userInfor))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
