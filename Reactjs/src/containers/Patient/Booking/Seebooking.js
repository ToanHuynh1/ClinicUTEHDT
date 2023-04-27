import React, { Component } from 'react';
import { Fragment } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import './Seebooking.scss'
import HomeHeader from '../../HomePage/HomeHeader';
import {getAllGuidebook, getAllGuidebookByType} from '../../../services/userService'
import _ from 'lodash'
import { LANGUAGES } from '../../../utils';
import { withRouter } from 'react-router';

class Seebooking extends Component {

    constructor(props)
    {
        super(props)
        this.state = {
        
        }
    }

    componentDidMount() {
       
        
    }



    async componentDidUpdate(prevProps,prevState,snapshot){
     
    }


    render() {

      
        return (
            <div className='see-booking-container'>  
                <HomeHeader/>
            
                <br/>
                <div className='title-see-booking'>Lịch hẹn của bạn</div>

                <div className='content-see-booking'>

                    <div className='count-booking'>
                        Tất cả: <span>10</span> lịch hẹn
                    </div>
                    <div className='booking'>
                        
                    </div>
                </div>
            </div>
        
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Seebooking));
