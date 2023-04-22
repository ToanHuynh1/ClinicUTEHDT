import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";


class Information extends Component {
   
    render() {
        return (
           <div className='section-share section-information'>
                <div className='section-information-top'>
                    <div className='inf-left'>
                        <div className='inf-logo'></div>
                        <b style={{fontSize: '18px'}} className='inf-company'>Công ty Cổ phần Công nghệ MEDICARE HCMUTE</b>
                        <p><b>Hotline: </b>0765969802</p>
                        <p><b>Hỗ trợ: </b>baotoandd2016@gmail.com</p>
                    </div>
                    <div className='inf-center'>
                        <b className='inf-about'>Tìm hiểu thêm</b>
                        <p className='mt-3'>Tuyển dụng</p>
                        <p>Câu hỏi thường gặp</p>
                        <p>Điều khoản sử dụng</p>
                        <p>Chính sách hoạt động</p>
                    </div>
                    <div className='inf-right'>
                        <p> <i className="fas fa-map-marker-alt postion-right"></i><b>Vị trí</b></p>                
                        <b className='mt-3'>Trụ sở Hồ Chí Minh</b>
                        <p>Số 1, Võ Văn Ngân, Thành phố Thủ Đức</p>
                        <b>Trụ sở Bình Dương</b>
                        <p>Phạm Ngũ Lầu, p.Dĩ An, Bình Dương</p>
                    </div>
                </div>
                <div className='section-information-below'>
                     <div><b>Tải ứng dụng Medicare HCMUTE cho điện thoại hoặc máy tính bảng</b></div>
                </div>
           </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Information);
