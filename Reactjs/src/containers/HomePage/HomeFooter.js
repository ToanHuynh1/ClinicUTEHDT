import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";

class HomeFooter extends Component {
   
    render() {
        return (
            <div className='home-footer'>
                
                <div className='footer-content'>
                    <p>&copy; 2023 Đồ án Công nghệ Phần mềm HĐT. Design By &#8594; <a href='https://www.facebook.com/profile.php?id=100009149872534'>HBT</a>&#8592;</p>
                </div>
                <div className='icon-footer'>
                    <div className='logo-face-footer'><a href='https://www.facebook.com/profile.php?id=100009149872534'><i className="fab fa-facebook-f facebook"></i></a></div>
                    <div className='logo-ytb-footer'><a href='https://www.youtube.com/watch?v=HsilcJ0uZ40'><i className="fab fa-youtube"></i></a> </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
