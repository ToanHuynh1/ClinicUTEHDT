import React, { Component } from 'react';
import { Fragment } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import {postVerifyAppointment} from '../../services/userService'
import HomeHeader from '../HomePage/HomeHeader';
import HomeFooter from '../HomePage/HomeFooter';
import './VerifyEmail.scss'
class VerifyEmail extends Component {

    constructor(props)
    {
        super(props)
        this.state = {
          statusVerify: false,
          errCode: 0
        }
    }

    async componentDidMount() {
        if (this.props.location && this.props.location.search)
        {
            const urlParams = new URLSearchParams(this.props.location.search);
            const token = urlParams.get('token');
            const doctorId = urlParams.get('doctorId');
            const gmail = urlParams.get('gmail')

            let res = await postVerifyAppointment({
                token :  token,
                doctorId: doctorId,
                gmail: gmail
            })

            if (res && res.errCode === 0 )
            {
                this.setState({
                    statusVerify: true,
                    errCode: res.errCode
                })
            }

            else
            {
                this.setState({
                    statusVerify: true,
                    errCode: res && res.errCode ? res.errCode : -1
                })
     
            }
          
        }

         
    }

    async componentDidUpdate(prevProps,prevState,snapshot){
     
    }


    render() {

        let {statusVerify, errCode} = this.state

        return (
            <>
                <HomeHeader isOpenMenu = {false}/>

                {statusVerify === false ? 
                    <div style={{marginTop: '69px'}}>Loading data ...</div>
                    :

                    <div style={{marginTop: '190px'}} className='customize-verify'>
                        {
                            +errCode === 0 ? <div style={{fontSize: '30px', textAlign: 'center', fontWeight:'600', color:'#8d4141'}}>
                                Xác nhận lịch hẹn thành công! Nếu đây là lần đầu tiên bạn sử dụng Gmail, hãy kiểm tra email để lấy mật khẩu đăng nhập
                            </div> : <div style={{fontSize: '30px', textAlign: 'center', fontWeight:'600', color:'#8d4141', textTransform: 'uppercase'}}>Lịch hẹn đã được xác nhận</div>
                        }
                    </div>
        
                }
               
            </>
        
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(VerifyEmail));
