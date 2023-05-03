import React, { Component } from 'react';
import { Fragment } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import './ExtraInfor.scss'
import HomeHeader from '../../HomePage/HomeHeader';
import {getAllBookingById} from '../../../services/userService'
import _ from 'lodash'
import moment from 'moment';
import { LANGUAGES } from '../../../utils';
import { withRouter } from 'react-router';

class ExtraInfor extends Component {

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
            <div className='ExtraInfor-container'>  
                <HomeHeader isOpenMenu = {false}/>

                <br/>
                <div className='ExtraInfor-cotent' style={{marginTop: '120px', textAlign: 'center', fontSize: '28px', fontWeight: '600'}}>
                    Chúng tôi sẽ sớm ra mắt phần mềm trên Android, IOS
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ExtraInfor));
