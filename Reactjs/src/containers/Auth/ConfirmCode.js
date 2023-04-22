import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import './ConfirmCode.scss';
import { FormattedMessage } from 'react-intl';
import { divide } from 'lodash';
import { Fragment } from 'react';
import { toast } from 'react-toastify';
import { withRouter } from 'react-router';
import { confirmPassword } from '../../services/userService';

class ConfirmCode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password1: '',
            password2: '',
            otp: '',
            isShowPassword: false,
            errMessage: '',
        }
    }

    handleOnChangePassword1 = (event) =>
    {
        this.setState({
            password1: event.target.value
        })
    }


    handleOnChangePassword2 = (event) =>
    {
        this.setState({
            password2: event.target.value
        })
    }


    handleOnChangeOTP = (event) =>
    {
        this.setState({
            otp: event.target.value
        })
    }

    handleShowHidePassword = () =>
    {
       this.setState({
        isShowPassword : !this.state.isShowPassword
       })
    }

    handleSwtichSignin = () => {
        this.props.history.push(`/login`)
    }


    handleConfirm = async () => {

        if (this.state.password1 !== this.state.password2){
            alert('Mật khẩu không trùng khớp')
        }

        let id = this.props.match.params.id

        if (this.state.otp === '')
        {
            this.setState({
                errMessage: 'Bạn chưa nhập mã OTP'
            })
        }

        else
        {
            let {otp, password1} = this.state

            let data = {}

            data.id = id
            data.otp = otp
            data.password1 = password1

            let result = await confirmPassword(data)

            if (result && result.errCode === 0){
                toast.success("Cập nhật mật khẩu thành công! ")
            }

            setTimeout(() => {
                this.props.history.push(`/login`)
            }, 3000); // 3000 là số miligiây tương ứng với 3 giây

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
                        <div className='col-12 text-login'>Quên mật khẩu
                        </div>
                            <div className='col-4 form-group login-input'>
                                <label style={{fontWeight: '600', fontSize: '17px'}}>Mã OTP:</label>
                                <input type='text' 
                                className='form-control' 
                                placeholder='Nhập mã OTP'
                                value={this.state.otp}
                                onChange= {(event) =>
                                {
                                    this.handleOnChangeOTP(event)
                                }}
                                />
                        
                            </div>

                            {/* <div className='col-3'>
                                <button className='btn-check' onClick={() =>{this.handleCheck()}}>Kiểm tra</button>
                            </div> */}
                     

                        <div className='col-12 form-group login-input'>
                            <label style={{fontWeight: '600', fontSize: '17px'}}>Nhập mật khẩu mới:</label>
                            <div className='custom-input-password'>
                                <input 
                                type={this.state.isShowPassword ? 'text' : 'password'} 
                                className='form-control' 
                                placeholder='Nhập lại mật khẩu'
                                value={this.state.password1}
                                onChange= {(event) =>
                                    {
                                        this.handleOnChangePassword1(event)
                                    }}
                                // onKeyDown={this.}
                                />
                                <span onClick={() => this.handleShowHidePassword()}>
                                    <i className= {this.state.isShowPassword ? 'fas fa-eye-slash': 'fas fa-eye'}></i>
                                </span>
                                 
                            </div>
                          
                        </div>

                        <div className='col-12 form-group login-input'>
                            <label style={{fontWeight: '600', fontSize: '17px'}}>Nhập lại mật khẩu mới:</label>
                            <div className='custom-input-password'>
                                <input 
                                type={this.state.isShowPassword ? 'text' : 'password'} 
                                className='form-control' 
                                placeholder='Nhập lại mật khẩu'
                                value={this.state.password2}
                                onChange= {(event) =>
                                    {
                                        this.handleOnChangePassword2(event)
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
                            <button className='btn-login' onClick={() =>{this.handleConfirm()}}>Xác nhận</button>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ConfirmCode));
