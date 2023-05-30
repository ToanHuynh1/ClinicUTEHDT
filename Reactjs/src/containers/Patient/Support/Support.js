import React, { Component } from 'react';
import { Fragment } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import './Support.scss'
import HomeHeader from '../../HomePage/HomeHeader';
import {getAllBookingById} from '../../../services/userService'
import _ from 'lodash'
import moment from 'moment';
import { LANGUAGES } from '../../../utils';
import { withRouter } from 'react-router';

class Support extends Component {

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
            <div className='support-container'>  
                <HomeHeader isOpenMenu = {false}/>

                <br/>
                <div className='support-cotent' style={{marginTop: '100px', textAlign: 'center', fontSize: '18px'}}>
                    <FormattedMessage id="homepage.contactsupport"/> <span style={{color: 'blue'}}>baotoandd2016@gmail.com</span>, <FormattedMessage id="homepage.extracontact"/> <span><a href='https://www.facebook.com/profile.php?id=100092272020913'>Clinic Hcmute</a></span>
                </div>
            </div>
        
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Support));
