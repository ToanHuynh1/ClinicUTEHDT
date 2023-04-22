import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import { toast } from 'react-toastify';
import * as actions from "../../store/actions";
import './Signup.scss';
import { FormattedMessage } from 'react-intl';
import { divide } from 'lodash';
import { Fragment } from 'react';
import { withRouter } from 'react-router';
import { postSignup } from '../../services/userService';

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isShowPassword: false,
            errMessage: '',
            email: '',
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

    handleSignup = async () =>
    {    
        this.setState({
            errMessage: ''
        })  

        try {
            let dataSignup = {}

            dataSignup.username = this.state.username
            dataSignup.email = this.state.email
            dataSignup.password = this.state.password


            let data = await postSignup(dataSignup)   
            if (data && data.errCode !== 0)
            {
                this.setState({
                    errMessage:  data.message
                })

            }

            if (data && data.errCode == 0)
            {
                toast.success("Tạo tài khoản thành công ! ")
                this.setState({
                    errMessage:  data.message
                })
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

    handleSwtichSignin = () => {
        this.props.history.push(`/login`)
    }
    render() {
        // jsx

        console.log(this.state)
        return (
            <div className='login-background'>

                
                <div className='img-login'>
                    <div className='img'>
                        
                    </div>
                </div>

                <div className='login-container'>
                    <div className='login-content row'>
                        <div className='col-12 text-login'>Đăng ký</div>
                        <div className='col-12 form-group login-input'>
                            <label style={{fontWeight: '600', fontSize: '17px'}}>Tên đăng nhập:</label>
                            <input type='text' 
                            className='form-control' 
                            placeholder='Nhập tên đăng nhập của bạn'
                            value={this.state.username}
                            onChange= {(event) =>
                            {
                                this.handleOnChangeUsername(event)
                            }}
                            />
                        </div>

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
                            <button className='btn-login' onClick={() =>{this.handleSignup()}}>Signup</button>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Signup));
