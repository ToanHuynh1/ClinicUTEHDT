import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import { toast } from 'react-toastify';
import * as actions from "../../../store/actions";
import './ModifyPassword.scss';
import { FormattedMessage } from 'react-intl';
import { divide } from 'lodash';
import { Fragment } from 'react';
import { withRouter } from 'react-router';
import { postModifyPassword } from '../../../services/userService';

class ModifyPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rePassword: '',
            password: '',
            isShowPassword1: false,
            isShowPassword2: false,
            isShowPassword3: false,
            errMessage: '',
            email: '',
            confirmRePassword: ''
        }
    }

    handleOnChangeUsername = (event) =>
    {
        this.setState({
            username: event.target.value
        })
    }

    handleOnChangeEmail = (event) =>
    {
        this.setState({
            email: event.target.value
        })
    }

    handleOnChangePassword = (event) =>
    {
        this.setState({
            password: event.target.value
        })
    }

    handleOnChangeRePassword = (event) =>
    {
        this.setState({
            rePassword: event.target.value
        })
    }

    handleOnChangeConfirmRePassword = (event) =>
    {
        this.setState({
            confirmRePassword: event.target.value
        })
    }

    handleModifyPassword = async () =>
    {    
        this.setState({
            errMessage: ''
        })  
        let checkArr = [ 'email', 'passowrd', 'rePassword', 'confirmRePassword']


        for(let i = 0 ; i< checkArr.length ; i++)
        {

            if (this.state[checkArr[i]] === '')
            {
                alert('Vui lòng nhập: ' + checkArr[i])
                return
            }
        }
        let rePassword = this.state.rePassword
        let email = this.state.email
        let password = this.state.password
        let confirmPassword = this.state.confirmRePassword

        if (confirmPassword !== rePassword)
        {
            alert('Mật khẩu nhập lại không chính xác')
        }

        else
        {
            let reponse = await postModifyPassword({
                email: email,
                oldPassword: password,
                newPassword: rePassword 
            })   

            if (reponse && reponse.errCode !== 0)
            {
                this.setState({
                    errMessage:  reponse.errMessage
                })
            }  

        
            else
            {
                toast.success("Đặt lại mật khẩu thành công ! ")
                this.setState({
                    errMessage:  reponse.errMessage,
                    rePassword: '',
                    password: '',
                    email: '',
                    confirmPassword: ''
                })

            }
       
        }
        
    }

    handleShowHidePassword1 = () =>
    {
       this.setState({
        isShowPassword1 : !this.state.isShowPassword1
       })
    }

    handleShowHidePassword2 = () =>
    {
       this.setState({
        isShowPassword2 : !this.state.isShowPassword2
       })
    }

    handleShowHidePassword3 = () =>
    {
       this.setState({
        isShowPassword3 : !this.state.isShowPassword3
       })
    }

    handleSwtichSignin = () => {
        this.props.history.push(`/login`)
    }

    handlePasswordKeyDown = (event) => {
        if (event.key === 'Enter') {
          this.handleForgotPassword();
        }
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
                        <div className='col-12 text-login' style={{fontSize: '18px'}}>Đặt lại mật khẩu</div>
                        <div className='col-12 form-group login-input'>
                            <label style={{fontWeight: '600', fontSize: '17px'}}>Email:</label>
                            <input type='text' 
                            className='form-control' 
                            placeholder='Nhập email của bạn'
                            value={this.state.email}
                            onChange= {(event) =>
                            {
                                this.handleOnChangeEmail(event)
                            }}
                            onKeyDown={this.handlePasswordKeyDown}
                            />
                        </div>

                        <div className='col-12 form-group login-input'>
                            <label style={{fontWeight: '600', fontSize: '17px'}}>Mật khẩu:</label>
                            <div className='custom-input-password'>
                                <input 
                                type={this.state.isShowPassword1 ? 'text' : 'password'} 
                                className='form-control' 
                                placeholder='Nhập mật khẩu của bạn'
                                value={this.state.password}
                                onChange= {(event) =>
                                    {
                                        this.handleOnChangePassword(event)
                                    }}
                                />
                                <span onClick={() => this.handleShowHidePassword1()}>
                                    <i className= {this.state.isShowPassword1 ? 'fas fa-eye-slash': 'fas fa-eye'}></i>
                                </span>
                                 
                            </div>
                          
                        </div>

                        <div className='col-12 form-group login-input'>
                            <label style={{fontWeight: '600', fontSize: '17px'}}>Mật khẩu mới:</label>
                            <div className='custom-input-password'>
                                <input 
                                type={this.state.isShowPassword2 ? 'text' : 'password'} 
                                className='form-control' 
                                placeholder='Nhập mật khẩu của bạn'
                                value={this.state.rePassword}
                                onChange= {(event) =>
                                    {
                                        this.handleOnChangeRePassword(event)
                                    }}
                                />
                                <span onClick={() => this.handleShowHidePassword2()}>
                                    <i className= {this.state.isShowPassword2 ? 'fas fa-eye-slash': 'fas fa-eye'}></i>
                                </span>
                                 
                            </div>
                          
                        </div>

                        <div className='col-12 form-group login-input'>
                            <label style={{fontWeight: '600', fontSize: '17px'}}>Xác nhận mật khẩu mới:</label>
                            <div className='custom-input-password'>
                                <input 
                                type={this.state.isShowPassword3 ? 'text' : 'password'} 
                                className='form-control' 
                                placeholder='Nhập mật khẩu của bạn'
                                value={this.state.confirmRePassword}
                                onChange= {(event) =>
                                    {
                                        this.handleOnChangeConfirmRePassword(event)
                                    }}
                                />
                                <span onClick={() => this.handleShowHidePassword3()}>
                                    <i className= {this.state.isShowPassword3 ? 'fas fa-eye-slash': 'fas fa-eye'}></i>
                                </span>
                                 
                            </div>
                          
                        </div>
                        
                        <div className='col-12' style={{color: 'red'}}>
                            {this.state.errMessage}
                        </div>
                        <div className='col-12'>
                            <button className='btn-login' onClick={() =>{this.handleModifyPassword()}}>Xác nhận</button>
                        </div>
                        <div className='signup-from-login'>Bạn đã có tài khoản? <span onClick={() => this.handleSwtichSignin()} style={{fontWeight: '600' , cursor: 'pointer', color: 'blue'}}>Đăng nhập</span></div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ModifyPassword));
