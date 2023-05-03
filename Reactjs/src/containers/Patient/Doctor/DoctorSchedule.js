import React, { Component } from 'react';
import { Fragment } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import './DoctorSchedule.scss'
import {getDetailInfoDoctor, getTimeOfDoctorByDate} from '../../../services/userService'
import { LANGUAGES } from '../../../utils';
import Select from 'react-select'
import moment from 'moment';
import localization from 'moment/locale/vi'
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';
import BookingSchedule from './Booking/BookingSchedule';
import { Link } from 'react-router-dom';

class DoctorSchedule extends Component {

    constructor(props)
    {
        super(props)
        this.state = {
           fullDayOfFoctor: [],
           allAvailableTime: [],
           currentDoctor: ''
        }
    }

    async componentDidMount() {

        let dateArr = []
        dateArr = this.getUpdateArray()

        if(this.props.match.params)
        {
            let response = await getTimeOfDoctorByDate(this.props.doctorIdParent, dateArr[0].value)

            this.setState({
                allAvailableTime: response.data ? response.data : []
            })
        }
        this.setState({
            fullDayOfFoctor: dateArr,
        })

        if (this.props.match && this.props.match.params && this.props.match.params.id)
        {
            let id = this.props.match.params.id

            this.setState({
                currentDoctor: id
            })
        }

    
         
    }

    async componentDidUpdate(prevProps,prevState,snapshot){
        if (this.props.language !== prevProps.language)
        {
            let dateArr = this.getUpdateArray()
            this.setState({
                fullDayOfFoctor: dateArr
            })
        }

        if (prevProps.doctorIdParent !== this.props.doctorIdParent)
        {
            let dateArr = this.getUpdateArray()

            let response = await getTimeOfDoctorByDate(this.props.doctorIdParent, dateArr[0].value)

            this.setState({
                allAvailableTime: response.data ? response.data : []
            })
        }
    }


    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    getUpdateArray = ()=>
    {
        let dateArr = []

        for(let i = 0 ; i< 7; i++)
        {
            let obj = {}
            if (this.props.language === LANGUAGES.VI)
            {
                if (i === 0)
                {
                    let dayMonth = moment(new Date()).format('DD/MM')
                    let today = `Hôm nay - ${dayMonth }`
                    obj.label = today
                }
                else
                {
                    let labelVi =  moment(new Date()).add(i, 'days').format('dddd - DD/MM')
                    obj.label = this.capitalizeFirstLetter(labelVi)
                }
            }
            else
            {
                if (i === 0)
                {
                    let dayMonth = moment(new Date()).format('DD/MM')
                    let today = `Today- ${dayMonth }`
                    obj.label = today
                }
                else
                {
                    obj.label = moment(new Date()).add(i, 'days').locale('en').format('ddd - DD/MM')
                }
            }
            obj.value = moment(new Date()).add(i, 'days').startOf('day').valueOf()
            dateArr.push(obj)
        }

        return dateArr;
    }


    handleChangeSelect =async (event) => 
    {
        if (this.props.doctorIdParent && this.props.doctorIdParent != -1)
        {
            let doctorId = this.props.doctorIdParent
            let date = event.target.value
            let response = await getTimeOfDoctorByDate(doctorId, date)
            if (response && response.errCode == 0)
            {
                this.setState({
                    allAvailableTime: response.data ? response.data : [] 
                })
            }
        }
    }

    handleToBooking = (doctorId, detailDoctorInfo, selectTime) =>
    {
        this.props.history.push({
            pathname: `/booking-schedule/${doctorId}`, 
            state: {
                detailDoctor: detailDoctorInfo,
                selectTime: selectTime
            }
        }
        )
    }
    render() {
        let {fullDayOfFoctor, allAvailableTime} = this.state
        let {language} = this.props
        let {doctorIdParent, detailDoctor} = this.props
        return (
            <div className='doctor-schedule-container'>
                    <div className='all-option-schedule'>
                        <select onChange={(event) => this.handleChangeSelect(event)}>
                            {fullDayOfFoctor && fullDayOfFoctor.length > 0 && fullDayOfFoctor.map((item,index) => {
                                return (
                                    <option value={item.value} key={index}>
                                        {item.label}
                                    </option>
                                )
                            })}

                        </select>
                    </div>
                    <div className='all-time-doctor'>
                            <div className='all-available-time'>
                                <div className='calender-title'>
                                    <span>
                                        <i className="fas fa-calendar-alt icon-title"></i>
                                        Xác nhận lịch hẹn thành công
                                    </span>
                                </div>
                                <div className='full-time-content'>
                                    {allAvailableTime && allAvailableTime.length > 0 ? 
                                    <>

                                    <div className='time-content-btn'>
                                        {
                                        allAvailableTime.map((item, index) => 
                                        {
                                            return (
                                             
                                                <button  key={index} className= {language === LANGUAGES.VI ? 'btnVi' : 'btnEn'} onClick= {() => this.handleToBooking(doctorIdParent, detailDoctor, item)}>
                                                {language === LANGUAGES.VI ? item.timeTypeData.valueVi : item.timeTypeData.valueEn}
                                                </button>
                                            )
                                        })
                                        }   
                                    </div>
                                    <div className='booking-no-fee'>
                                        <span><FormattedMessage id= "patient.detail-doctor.choose"/> <i className="far fa-hand-pointer"></i> <FormattedMessage id= "patient.detail-doctor.book-free"/> </span> 
                                    </div>
                                    </>
                                    
                                    : 
                                    <div className='no-appointment'>
                                        <FormattedMessage id= "patient.detail-doctor.no-appointment"/>
                                    </div>
                                    }
                                </div>                           
                            </div>
                    </div>
            </div>
        
        );
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule));
