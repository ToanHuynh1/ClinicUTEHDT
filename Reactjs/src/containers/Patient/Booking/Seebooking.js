import React, { Component } from 'react';
import { Fragment } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import './Seebooking.scss'
import HomeHeader from '../../HomePage/HomeHeader';
import {getAllBookingById} from '../../../services/userService'
import _ from 'lodash'
import moment from 'moment';
import { LANGUAGES } from '../../../utils';
import { withRouter } from 'react-router';

class Seebooking extends Component {

    constructor(props)
    {
        super(props)
        this.state = {
            dataAllBooking: {}
        }
    }

    async componentDidMount() {
        let {userInfo} = this.props

        if (userInfo)
        {
    
            let reponse = await getAllBookingById({
                patientId: userInfo.id
            })

            if (reponse)
            {
                this.setState({
                    dataAllBooking: reponse.info
                })
            }
          
        }
  

    }



    async componentDidUpdate(prevProps,prevState,snapshot){
     
    }


    render() {
        let {dataAllBooking} = this.state

        if (dataAllBooking && dataAllBooking.length > 0)
        {
            dataAllBooking.map((item,index) => {
                item.date =  moment.unix(+ item.date/1000).format('dddd - DD/MM/YYYY');
                return item;
            })
        }


        return (
            <div className='see-booking-container'>  
                <HomeHeader/>
            
                <br/>
                <div className='title-see-booking'>Lịch hẹn của bạn</div>

                <div className='content-see-booking'>

                    {dataAllBooking && dataAllBooking.length > 0 ? (
                       <div className='count-booking' style={{fontWeight: '600'}}>
                           Tất cả: <span>{dataAllBooking.length}</span> lịch hẹn
                       </div> 
                        ) : 
                        (
                            <div className='count-booking'>
                                Không có lịch hẹn
                            </div> 
                        )
                    }
                    {dataAllBooking && dataAllBooking.length > 0 && dataAllBooking.map((item, index) => {
                        return (
                            <div className='booking' key={index}>
                                <div className='custom-history-booking'>
                                    <div className='left'>
                                    <div className='action'>
                                        {item.statusId !== null && item.statusId === 'S2' && 
                                        (
                                        <div>
                                            Đang chờ khám
                                        </div>
                                        )
                                        }
                                        {item.statusId !== null && item.statusId === 'S3' && 
                                        (
                                        <div>
                                            Đã khám xong
                                        </div>
                                        )
                                        }
                                    </div>
                                    </div>
                                    <div className='right'>
                                    <div style={{fontWeight: '600', marginBottom: '10px', fontSize: '20px'}}>
                                        Bác sĩ: {`${item.doctorBookingData.lastName} ${item.doctorBookingData.firstName} `}
                                    </div>
                                    <div style={{ marginBottom: '10px'}}>
                                        Ngày: {item.date}
                                    </div> 
                                    <div style={{ marginBottom: '10px'}}>
                                        Thời gian: {item.timeTypeDataPatient.valueVi}
                                    </div> 
                                    </div>
                                </div>  
                            </div>
                        )})
                    }
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Seebooking));
