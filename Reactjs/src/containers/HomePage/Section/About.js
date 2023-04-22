import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";


class About extends Component {
   
    render() {
        return (
            <div className='section-share section-about'>
                <div className='section-about-header'>
                    Tư liệu về MEDICARE HCMUTE
                </div>
                <div className='section-about-content'>
                    <div className='content-left'>
                        <iframe 
                            width="85%" height="370px" src="https://www.youtube.com/embed/U_6xHKGf3Ho" 
                            title="THỎ BẢY MÀU - THẦN BÀI MIỀN TÂY | Hoạt Hình Tết 2023" 
                            frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                            allowFullScreen>
                        </iframe>
                    </div>
                    <div className='content-right'>
                        <div className='about-top'>
                            <a href='https://bookingcare.vn/'>
                                <div className='icon-ictnews'></div>
                            </a>
                            <a href='https://bookingcare.vn/'>
                                <div className='icon-infonet'></div>
                            </a>
                            <a href='https://bookingcare.vn/'>    
                                <div className='icon-suckhoedoisong'></div>
                            </a>
                     
                        </div>
                        <div className='about-center'>
                            <a href='https://bookingcare.vn/'>    
                                <div className='icon-vnexpress'></div>
                            </a>
                            <a href='https://bookingcare.vn/'>    
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
