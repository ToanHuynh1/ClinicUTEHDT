import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";
import { withRouter } from 'react-router';

class Information extends Component {
   
    hanClickClose = () => {
        this.props.handleClickCloseMenu()
    }

    handleSwitchQuestion = () => {
        this.props.history.push(`/information`)
    }

    hanClickClose = () => {
        this.props.handleClickCloseMenu()
    }
    render() {
        return (
           <div className='section-share section-information' onClick={() => this.hanClickClose()}>
                <div className='section-information-top'>
                    <div className='inf-left'>
                        <div className='inf-logo'></div>
                        <b style={{fontSize: '18px'}} className='inf-company'><FormattedMessage id="homepage.companyinfor"/></b>
                        <p><b>Hotline: </b>0765969802</p>
                        <p><b><FormattedMessage id="homepage.support"/>: </b>baotoandd2016@gmail.com</p>
                    </div>
                    <div className='inf-center'>
                        <b className='inf-about'><FormattedMessage id="homepage.findoutmore"/></b>
                        <p className='mt-3' onClick={() => this.handleSwitchQuestion()} style={{cursor: 'pointer'}}><FormattedMessage id="homepage.question"/></p>
                    </div>
                    <div className='inf-right'>
                        <p> <i className="fas fa-map-marker-alt postion-right"></i><b><FormattedMessage id="homepage.position"/></b></p>                
                        <b className='mt-3'><FormattedMessage id="homepage.headquarters"/> Ho Chi Minh</b>
                        <p>So 1, Vo Van Ngan, Thanh pho Thu Duc</p>
                        <b><FormattedMessage id="homepage.headquarters"/>  Binh Duong</b>
                        <p>Pham Ngu Lau, p.Di An, Binh Duong</p>
                    </div>
                </div>
                <div className='section-information-below'>
                     <div><b><FormattedMessage id="homepage.download"/></b></div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Information));
