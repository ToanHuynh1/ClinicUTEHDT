import React, { Component } from 'react';
import { Fragment } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import './InformationExtra.scss'
import {getAllBookingById} from '../../../services/userService'
import _ from 'lodash'
import moment from 'moment';
import { LANGUAGES } from '../../../utils';
import { withRouter } from 'react-router';
import HomeHeader from '../../HomePage/HomeHeader';

class InformationExtra extends Component {

    constructor(props)
    {
        super(props)
        this.state = {
           
        }
    }

    async componentDidMount() {

    }



    async componentDidUpdate(prevProps,prevState,snapshot){
     
    }


    render() {

        return (
            <>
            <HomeHeader>

            </HomeHeader>
            <div className='InformationExtra-container' style={{marginTop: '69px'}}>  
                
                <div class="title-question">
                    <h1>Về Medical HCMUTE</h1>
                </div>
                <ul class="list-answer">
                    <li class="item-answer">
                        <h3>Medical HCMUTE nỗ lực vì điều gì?</h3>
                        <p>Medical HCMUTE nỗ lực xây dựng Nền tảng Y tế chăm sóc sức khỏe toàn diện hàng đầu Việt Nam vươn tầm khu vực Asean, giúp bệnh nhân lựa chọn dịch vụ y tế phù hợp nhằm nâng cao hiệu quả chữa bệnh, tiết kiệm thời gian và chi phí.</p>
                    </li>
                    <li class="item-answer">
                        <h3>Medical HCMUTE có phải là một bệnh viện, hay phòng khám không?</h3>
                        <p>Medical HCMUTE là Nền tảng Y tế Chăm sóc sức khỏe toàn diện kết nối người dùng đến với dịch vụ y tế - chăm sóc sức khỏe chất lượng, hiệu quả và tin cậy.
                            Medical HCMUTE kết nối mạng lưới bác sĩ giỏi ở nhiều bệnh viện, phòng khám khác nhau. Có thể hình dung, Medical HCMUTE hoạt động theo mô hình tương tự như Taxi Uber hay Grab trong lĩnh vực Y tế - Chăm sóc sức khỏe.</p>
                    </li>
                    <li class="item-answer">
                        <h3>Mối quan hệ của Medical HCMUTE với các bệnh viện, phòng khám là gì?</h3>
                        <p>Medical HCMUTE hợp tác với các bệnh viện/phòng khám, cung cấp các thông tin về khám chữa bệnh tại bệnh viện/phòng khám cho người bệnh để người bệnh có thể dễ dàng lựa chọn bác sĩ phù hợp và đặt lịch nhanh chóng.</p>
                    </li>
                    <li class="item-answer">
                        <h3>Medical HCMUTE miễn phí đặt lịch, vậy Medical HCMUTE thu phí bằng cách nào?</h3>
                        <p>Các cơ sở y tế sẽ chi trả chi phí dịch vụ cho Medical HCMUTE.</p>
                    </li>
                </ul>
            </div>
            </>
           
        
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(InformationExtra));
