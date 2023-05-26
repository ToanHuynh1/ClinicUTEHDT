import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";


class About extends Component {
    hanClickClose = () => {
        this.props.handleClickCloseMenu()
    }
    render() {
        return (
            <div className='section-share section-about' onClick={() => this.hanClickClose()}>
                <div className='section-about-header'>
                  <FormattedMessage id="homepage.Materials"/>
                </div>
                <div className='section-about-content'>
                    <div className='content-left'>
                        <iframe 
                            width="700" 
                            height="406" 
                            src="https://www.youtube.com/embed/FyDQljKtWnI" 
                            title="CÀ PHÊ KHỞI NGHIỆP VTV1 - BOOKINGCARE - HỆ THỐNG ĐẶT LỊCH KHÁM TRỰC TUYẾN" 
                            frameBorder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                            allowFullScreen>
                        </iframe>
                    </div>
                    <div className='content-right'>
                        <div className='about-top'>
                            <a href='https://vietnamnet.vn/ictnews'>
                                <div className='icon-ictnews'></div>
                            </a>
                            <a href='https://infonet.vietnamnet.vn/'>
                                <div className='icon-infonet'></div>
                            </a>
                            <a href='https://suckhoedoisong.vn/'>    
                                <div className='icon-suckhoedoisong'></div>
                            </a>
                     
                        </div>
                        <div className='about-center'>
                            <a href='https://vnexpress.net/'>    
                                <div className='icon-vnexpress'></div>
                            </a>
                            <a href='https://vtv.vn/truyen-hinh-truc-tuyen/vtv1/chuyen-dong-24h-0.htm'>    
                                 <div className='icon-vtv1'></div>
                            </a>
                        </div>
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
