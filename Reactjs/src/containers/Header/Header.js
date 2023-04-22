import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu, doctorMenu, patientMenu } from './menuApp';
import './Header.scss';
import logo_vi from '../../assets/images/vi.png'
import logo_en from '../../assets/images/en.png'
import { LANGUAGES, ROLES_USER } from '../../utils'; 
import { FormattedMessage } from 'react-intl';
import _ from 'lodash'

class Header extends Component {
    constructor(props){
        super(props);
        {
            this.state = {
                menuApp: []
            }
        }
    }
    
    handleModifyLanguage = (language) =>
    {
        this.props.changeLanguageAppRedux(language)
    }

    componentDidMount(){
        let {userInfo} = this.props
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
            menuApp: menu
        })
    }
    render() {
        const { language, userInfo } = this.props;
 
      
        return (
            
            <div className="header-container">
        
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={this.state.menuApp} />
                </div>
                
                <div className='language'>
                        <span className='welcome'><FormattedMessage id = "homeheader.welcome"/> , {userInfo && userInfo.lastName ? userInfo.lastName : ""}</span>
                        <span 
                            className={language === LANGUAGES.VI ? 'language-vn active' : 'language-vn'} 
                            onClick={() => this.handleModifyLanguage(LANGUAGES.VI)}
                        >
                            <img src={logo_vi}></img>
                            <b>Vi</b>
                        
                        </span>
               
                        <span 
                            className={language === LANGUAGES.EN ? 'language-en active' : 'language-en'} 
                            onClick={() => this.handleModifyLanguage(LANGUAGES.EN)}
                        >
                            <img src={logo_en}></img>
                            <b>En</b>
                        </span>
                        {/* nút logout */}
                        <div className="btn btn-logout" onClick={this.props.processLogout} title="LOGOUT">
                            <i className="fas fa-sign-out-alt"></i>
                        </div>

                </div>
            </div>
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
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
