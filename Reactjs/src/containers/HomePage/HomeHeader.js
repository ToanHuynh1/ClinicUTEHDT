import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../HomePage/HomeHeader.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import logo_vi from '../../assets/images/vi.png'
import logo_en from '../../assets/images/en.png'
import avatar_header from '../../assets/about/avatar_header.png'
import { FormattedMessage } from 'react-intl';
import {LANGUAGES , ROLES_USER} from '../../utils'
import  {changeLanguageApp} from '../../store/actions'
import { withRouter } from 'react-router';
import * as actions from "../../store/actions";
import _, { isBoolean } from 'lodash'
import { adminMenu, doctorMenu } from '../Header/menuApp';


class HomeHeader extends Component {
    constructor(props)
    {
        super(props)
        this.state = {
            isOpen: false,
            dataUserlogin: {}
        };
    }
    changeLanguage = (language) =>
    {
        this.props.changeLanguageAppRedux(language)
        // fire redux event: actions
    }


    componentDidMount = () => {
        let {userInfo} = this.props

        this.setState({
            dataUserlogin: userInfo
        })
        let menu = []
        if (userInfo && ! _.isEmpty(userInfo))
        {
            let roleId = userInfo.roleId
            if (roleId === ROLES_USER.ADMIN)
            {
                menu = adminMenu
            }
            if (roleId === ROLES_USER.DOCTOR)
            {
                menu = doctorMenu
            }
        }

        this.setState({
            menuApp: menu,
        })
    }

    undoHomePage = () => 
    {
        this.props.history.push(`/home`)
    }


    logOut = () => {
        this.props.processLogout()
        this.props.history.push(`/login`)

    }


    handleOpenInfor = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    handleSwtichLogin = () => {
        this.props.history.push(`/login`)
    }


    handleUpdateProfile = () => {
        let check = true;
        this.setState({
            isOpen: false
        })
        this.props.handleOpenUpdateInfo(check)
    }

    handleSeeBooking =  () => {
        this.props.history.push(`/seebooking`)
    }

    SwtichSeeAllSpecialty = () => {
        this.props.history.push(`/see-all-specialty`) 
    }

    SwitchSeeAllDoctor = () => {
        this.props.history.push(`/see-all-doctor`) 

    }

    handleSwitchSeeALlClinic = () => {
        this.props.history.push(`/see-all-clinic`) 

    }

    render() {
      
        let {isOpen, dataUserlogin} = this.state
        let language = this.props.language

        return (
            <React.Fragment>  
                <div className='home-header-container'>
                    <div className='home-header-content'>
                    <div className='left-container'>
                        <i className="fas fa-bars bar-header"></i>
                        <div className='header-logo' onClick={() => this.undoHomePage()}></div>
                    </div>
                    <div className='center-container'>
                        <div className='child-content' onClick={() => this.SwtichSeeAllSpecialty()}>
                            <div >
                                <b><FormattedMessage id= "homeheader.speciality"/></b>
                            </div>
                            <div className='subs-title' >
                                <FormattedMessage id= "homeheader.searchDoctor"/>
                            </div>
                        </div>
                        <div className='child-content'  onClick= {() => this.handleSwitchSeeALlClinic()}>
                            <div>
                                <b><FormattedMessage id= "homeheader.health-facility"/></b>
                            </div>
                            <div className='subs-title'>
                                 <FormattedMessage id= "homeheader.select-room"/>
                            </div>
                        </div>
                        <div className='child-content' onClick={() => this.SwitchSeeAllDoctor()}>
                            <div>
                                <b><FormattedMessage id= "homeheader.doctor"/></b>
                            </div>
                            <div className='subs-title'>
                                <FormattedMessage id= "homeheader.select-doctor"/>
                            </div>
                        </div>
                        <div className='child-content'>
                            <div>
                                <b><FormattedMessage id= "homeheader.fee"/></b>
                            </div>
                            <div className='subs-title'>
                                <b><FormattedMessage id= "homeheader.check-health"/></b>
                            </div>
                        </div>
                    </div>
                    <div className='right-container'>
                        <div className='support'>
                            <span>
                                <i className="fas fa-question-circle icon-hotro"></i>
                                <b>
                                    <FormattedMessage id= "homeheader.support"/>
                                </b>
                            </span>
                        </div>
                        <div className='language-vn'>
                            <div className={language === LANGUAGES.VI ? 'content_language_vi active' : 'content_language_vi'}>
                                <span onClick={() => this.changeLanguage(LANGUAGES.VI)} >
                                    <img src={logo_vi}></img>
                                    Vi
                                </span>
                            </div>
                        </div>
                        <div className='language-en'>
                            <div  className={language === LANGUAGES.EN ? 'content_language_en active' : 'content_language_en'}>
                                <span onClick={() => this.changeLanguage(LANGUAGES.EN)}>
                                    <img src={logo_en}></img>
                                    En
                                </span>
                             </div>
                        </div>

                        <div className='avatar-profile' onClick={() => this.handleOpenInfor()}>
                            <span>
                                <img src={avatar_header}></img>
                            </span>
                        </div>

                        {isOpen === true ? (
                        <div className="model">
                            <div className="model-inner">
                                
                            {dataUserlogin && (
                            <div className="btn btn-logout" onClick={() => this.logOut()} title="LOGOUT">
                                <i className="fas fa-sign-out-alt"></i>
                            </div>
                            )}

                                {dataUserlogin !== null ? (
                                <div className='avatar'>
                                    <img src={avatar_header} />
                                    <div className='name'>
                                    <span>{dataUserlogin.firstName}</span>
                                    </div>
                                    <div className='gmail'>
                                    <span>{dataUserlogin.email}</span>
                                    </div>
                                </div>
                                ) : (
                                <div className='avatar'>
                                    <img src={avatar_header} />
                                    <div className='name'>
                                    <span>GUEST</span>
                                    </div>
                                    <div className='gmail'>
                                    <span>GUEST</span>
                                    </div>
                                </div>
                                )}


                            </div>

                            {dataUserlogin ? (
                            <div className='handle'>
                               <button className='update-profile' onClick={() => this.handleUpdateProfile()}>Cập nhật</button>
                                <button className='seen-booking' onClick={() => this.handleSeeBooking()}>Xem lịch hẹn</button>
                            </div>

                            ):  <button className='btn-login' onClick={() => this.handleSwtichLogin()}>Đăng nhập</button>}
                                                
                            </div>
                            ) : null}
 
                    </div>
                </div>
                </div>

                {this.props.isShowBanner === true && 
                <div className='home-hearder-banner'>
                    <div className='content-up'>
                        <div className='title-banner'>
                             <FormattedMessage id= "banner.title-banner"/>
                        </div>
                        <div className='title-banner-small'>
                             <FormattedMessage id= "banner.title-banner-small"/>
                        </div>
                        <div className='search'>
                            <i className="fas fa-search search-icon"></i>
                            <input className='search-input' placeholder='Tìm chuyên khoa'></input>
                        </div>
                        <div className='icon-android'>
                            <div className='ic_android'>
                            </div>
                            <div className='ic_ios'>
                            </div>
                        </div>
                    </div>
                    <div className='content-down'>
                        <div className='options'>
                            <div className='option-child'>
                                <div className='icon-option-child' onClick = {() => this.SwtichSeeAllSpecialty()}>
                                    <i className="fas fa-hospital-alt"></i>
                                </div>
                                <div className='text-option-child'>
                                     <FormattedMessage id= "banner.Specialtyexamination" />
                                </div>
                            </div>
                            <div className='option-child'>
                                 <div className='icon-option-child'>
                                  <i className="fas fa-phone"></i>
                                </div>
                                <div className='text-option-child'>
                                    <FormattedMessage id= "banner.Remotemedical"/>
    
                                </div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-option-child'>
                                  <i className="fas fa-notes-medical"></i>
                                </div>
                                <div className='text-option-child'>
                                    <FormattedMessage id= "banner.healthcheckup"/>
    
                                </div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-option-child'>
                                 <i className="fas fa-vials"></i>
                                </div>
                                <div className='text-option-child'>
                                    <FormattedMessage id= "banner.Medicaltesting"/>
                                </div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-option-child icon-sk-tinhthan'>
                                 <i className="fas fa-user-check"></i>
                                </div>
                                <div className='text-option-child'>
                                    <FormattedMessage id= "banner.Mentalhealth"/>
                                </div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-option-child'>
                                  <i className="fas fa-syringe"></i>
                                </div>
                                <div className='text-option-child'>
                                   <FormattedMessage id= "banner.Dentalexamination"/>
                                </div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-option-child'>
                                     <i className="fas fa-utensil-spoon"></i>
                                </div>
                                <div className='text-option-child'>
                                    <FormattedMessage id= "banner.Surgicalpackage"/>
    
                                </div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-option-child'>
                                    <i className="fas fa-x-ray"></i>
                                </div>
                                <div className='text-option-child'>
                                    <FormattedMessage id= "banner.Medicalproducts"/>
                                </div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-option-child'>
                                     <i className="fas fa-hospital"></i>
                                </div>
                                <div className='text-option-child'>
                                    <FormattedMessage id= "banner.Corporatehealth"/>
    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                }
            </React.Fragment>
         
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
