import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import { toast } from 'react-toastify';
import * as actions from "../../store/actions";
import './ForgotPassword.scss';
import { FormattedMessage } from 'react-intl';
import { divide } from 'lodash';
import { Fragment } from 'react';
import { withRouter } from 'react-router';
import { forgotPassword } from '../../services/userService';

class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errMessage: '',
            email: '',
        }
    }

    handleOnChangeEmail = (event) =>
    {
        this.setState({
            email: event.target.value
        })
    }

    handleCancel = () => {
        this.props.history.push(`/login`)
    }

    handleForgotPassword = async () => {

        this.setState({
            errMessage: ''
        })  

        try {
            let dataForgot = {}

            dataForgot.email = this.state.email

            let data = await forgotPassword(dataForgot)   
            if (data && data.errCode !== 0)
            {
                this.setState({
                    errMessage:  data.message
                })

            }

            if (data)
            {
                this.setState({
                    errMessage:  data.errMessage
                })
            }

            if (data && data.errCode === 0 ){
                this.props.history.push(`/confirm/${data.user.id}`)
            }
              } catch (error) {
            if (error.response)
            {
                if (error.response.data)
                {
                    this.setState({
                        errMessage: error.response.data.errMessage
                    })
                }
            }   
        }
        
    }


    handlePasswordKeyDown = (event) => {
        if (event.key === 'Enter') {
          this.handleForgotPassword();
        }
    }



    render() {
        // jsx
        return (
            <div className='forgot-background'>

                <div className='forgot-container'>
                    <div className='login-content row'>
                        <div className='col-12 text-login'>Quên mật khẩu</div>
                        <div className='signup-from-login'>Vui lòng nhập địa chỉ email để tìm kiếm tài khoản của bạn.</div>

                        <div className='col-12 form-group login-input'>
                            <label style={{fontWeight: '600', fontSize: '17px'}}>Email:</label>
                            <input type='text' 
                            style={{height: '48px', marginBottom: '12px'}}
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


                        <div className='col-12' style={{color: 'red'}}>
                            {this.state.errMessage}
                        </div>

                        <div className='col-4'>
                            
                        </div>

                        <div className='col-4'>
                            <button className='btn-cancel' onClick={() =>{this.handleCancel()}}>Hủy</button>
                        </div>

                        <div className='col-4'>
                            <button className='btn-submit' onClick={() =>{this.handleForgotPassword()}}>Xác nhận</button>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ForgotPassword));
