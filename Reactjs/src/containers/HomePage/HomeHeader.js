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
            dataUserlogin: {},
            isOpenMenu: false,
            isOpenAllMenu: false,
            
        };

    }
    changeLanguage = (language) =>
    {
        this.props.changeLanguageAppRedux(language)
        // fire redux event: actions
    }

    componentDidUpdate(prevProps,prevState,snapshot){
        if (prevProps.isOpenAllMenu !== this.props.isOpenAllMenu)
        {
            this.setState({
                isOpenAllMenu: this.props.isOpenAllMenu
            })
        }
    }

    componentDidMount = () => {
        let {userInfo, isOpenMenu, isOpenAllMenu, isOpen} = this.props
        this.setState({
            dataUserlogin: userInfo,
            isOpenMenu: isOpenMenu,
            isOpenAllMenu: isOpenAllMenu,
            isOpen: isOpen
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
            isOpen: !this.state.isOpen
        })

        this.props.history.push(`/update-infor-patient`)
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

    handleSwtichSupport = () => {
        this.props.history.push(`/support`) 
    }

    openAllMenu = () => {
        this.setState({
            isOpenAllMenu: !this.state.isOpenAllMenu
        })
        this.props.handleClickCloseMenu(true)
    }

    handleSwitchGuidebook = () => {
        this.props.history.push(`/see-all-guidebook`) 
    }


    handleSwitchExtraInfor = () => {
        this.props.history.push(`/extra-infor`) 
    }

    render() {
      
        let {isOpen, dataUserlogin, isOpenMenu, isOpenAllMenu} = this.state
        let language = this.props.language

        return (
            <React.Fragment >  
                <div className='home-header-container' >
                    <div className='home-header-content'>
                    <div className='left-container'>
                        {isOpenMenu === true && (
                            <i className="fas fa-bars bar-header" onClick={() => this.openAllMenu()}></i>
                        )}
                        {isOpenAllMenu === true  && (
                        <div className="model-all-menu" >
                            <div className="model-inner">
                                <div className='title-all-menu'>Medical HCMUTE</div>
                                
                                <div className='content'>
                                    <div>
                                        <div className="event-modal" onClick={() => {
                                            this.props.history.push(`/home`)}} style={{cursor: 'pointer'}}><FormattedMessage id="homepage.home"/></div>
                                    
                                    </div>
                                    <div>
                                        <div className="event-modal" onClick={() => {
                                            this.props.history.push(`/see-all-guidebook`)}}  style={{cursor: 'pointer'}}><FormattedMessage id="homepage.guidebook"/></div>
                                    </div>
                                    <div>
                                        <div className="event-modal" onClick={() => {
                                            this.props.history.push(`/see-all-clinic`)}} style={{cursor: 'pointer'}} ><FormattedMessage id="homepage.clinic"/></div>
                                    </div>
                                    <div>
                                        <div className="event-modal" onClick={() => {
                                            this.props.history.push(`/see-all-doctor`)}} style={{cursor: 'pointer'}} ><FormattedMessage id="homepage.doctor"/></div>
                                    </div>
                                    <div>
                                        <div className="event-modal" onClick={() => {
                                            this.props.history.push(`/support`)}} style={{cursor: 'pointer'}}><FormattedMessage id="homepage.contact"/></div>
                                    </div>

                                </div>

                            </div>
                        </div>
                        )}
            
                       
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
                        <div className='child-content' onClick={() => this.handleSwitchGuidebook()}>
                            <div>
                                <b><FormattedMessage id= "homeheader.fee"/></b>
                            </div>
                            <div className='subs-title'>
                                <b><FormattedMessage id= "homeheader.check-health"/></b>
                            </div>
                        </div>
                    </div>
                    <div className='right-container'>
                        <div className='support' onClick={() => this.handleSwtichSupport()}>
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
                               <button className='update-profile' onClick={() => this.handleUpdateProfile()}><FormattedMessage id="homepage.update"/></button>
                                <button className='seen-booking' onClick={() => this.handleSeeBooking()}><FormattedMessage id="homepage.seebooking"/></button>
                            </div>

                            ):  <button className='btn-login' onClick={() => this.handleSwtichLogin()}><FormattedMessage id="homepage.login"/></button>}
                                                
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
                        {/* <div className='search'>
                            <input class='search-input' placeholder='Medical HCMUTE xin chào quy khách' ></input>
                        </div> */}
                        <div className='icon-android'>
                            <div className='ic_android' onClick={() => this.handleSwitchExtraInfor()}>
                            </div>
                            <div className='ic_ios' onClick={() => this.handleSwitchExtraInfor()}>
                            </div>
                        </div>
                    </div>
                    <div className='content-down'>
                        <div className='options'>
                            <div className='option-child'>
                                <div className='icon-option-child'>
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
