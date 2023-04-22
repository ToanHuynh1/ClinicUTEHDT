import React, { Component } from 'react';
import { Fragment } from 'react';
import { connect } from "react-redux";
import './BookingSchedule.scss'
import HomeHeader from '../../../HomePage/HomeHeader';
import HomeFooter from '../../../HomePage/HomeFooter';
import moment from 'moment';
import { LANGUAGES } from '../../../../utils';
import NumberFormat from 'react-number-format';
import DoctorProfile from '../DoctorProfile'
import _ from 'lodash'
import Select from 'react-select';
import DatePicker from '../../../../components/Input/DatePicker';
import * as actions from '../../../../store/actions'
import {postPatientBookingAppointment} from '../../../../services/userService'
import { toast } from 'react-toastify';
import { FormattedMessage } from 'react-intl';
// import LoadingOverlay from 'react-loading-overlay';


class BookingSchedule extends Component {

    constructor(props)
    {
        super(props)
        this.state = {
            detailDoctor: {},
            selectTime: {},
            fullName: '',
            phoneNumber: '',
            email: '',
            address:'',
            reason:'',
            birthday:'',
            genders:'',
            doctorForId: '',
            selectedGender: '', 
            timeType: '',
            isShow: true
        }
    }

    componentDidMount() {
        this.setState({
            detailDoctor: this.props.location.state.detailDoctor,
            selectTime: this.props.location.state.selectTime,
            doctorForId: this.props.location.state.selectTime.doctorId,
            timeType: this.props.location.state.selectTime.timeType
        })

        this.props.fetchGenders()
      
    }

    builidDataGender = (data) =>{
        let result = []
        let language = this.props.language

        if (data && data.length > 0){
            data.map((item, index) => {
                let obj = {}
                obj.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn
                obj.value = item.keyMap
                result.push(obj)
            })
        }

        return result
    }

    componentDidUpdate(prevProps,prevState,snapshot){
        if (this.props.genders !== prevProps.genders)
        {
            if (this.props.genders.length > 0)
            {
                let data = this.props.genders
                let language = this.props.language
                data.map((item, index) => {

                })
            }
            this.setState({
                genders: this.builidDataGender(this.props.genders)
            })
        }

        if (this.props.language !== prevProps.language)
        {
            this.setState({
                genders: this.builidDataGender(this.props.genders)
            })
        }


    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }


    handleOnChangeInput = (event, id) => {
        let valueInput = event.target.value
        let stateCoppy = {...this.state}

        // stateCoppy . tới key
        stateCoppy[id] = valueInput
        this.setState({
            ...stateCoppy
        })
    }

    handleOnchangeDataPicker = (date) =>{
        this.setState({
            birthday: date[0]
        })
    }

    handleChangeSelect = (selectedOption) => 
    {
        this.setState({ selectedGender: selectedOption});

    }

    buildNameDoctor = () => 
    {
        let {language} = this.props


        console.log(this.state.detailDoctor)
        if (this.state.detailDoctor && !_.isEmpty(this.state.detailDoctor)){
            let name = language === LANGUAGES.VI ? 
            `${this.state.detailDoctor.lastName}${this.state.detailDoctor.firstName}`
            :
            `${this.state.detailDoctor.firstName} ${this.state.detailDoctor.lastName}`

            return name
        }
        return ''
    }
    bulidTimeBooking = (dataTime) => {

        let {language} = this.props
        if (dataTime && !_.isEmpty(dataTime ))
        {
            let time = language === LANGUAGES.VI ? this.state.selectTime.timeTypeData.valueVi :this.state.selectTime.timeTypeData.valueEn 
        
            let  date = language === LANGUAGES.VI ? moment.unix(+ dataTime.date/1000).format('dddd - DD/MM/YYYY') : 
            moment.unix(+ dataTime.date/1000).locale('en').format('ddd - MM/DD/YYYY') 
            return `${time}, ${date}`
        }

        return ''
    }

    handleConfirmBooking = async () =>{

        let date = new Date(this.state.birthday).getTime()

        this.setState({
            isShow: true
        })

        let timeString = this.bulidTimeBooking(this.state.selectTime)


        let doctorName = this.buildNameDoctor()

        let response = await postPatientBookingAppointment({
            fullName: this.state.fullName,
            phoneNumber:  this.state.phoneNumber,
            email:  this.state.email,
            address: this.state.address,
            reason: this.state.reason,
            date: this.state.selectTime.date,
            birthday: date,
            selectedGender: this.state.selectedGender.value,
            doctorId:  this.state.doctorForId,
            timeType: this.state.timeType,
            language: this.props.language,
            timeString: timeString,
            doctorName:doctorName
        })

        if (response && response.errCode == 0)
        {
            toast.success("Booking a new appointment succeed ! ")
            this.setState({
                isShow: false
            })
    
        }
        else
        {
            toast.error("Booking a new appointment error ! ")
        }
    }
 
    render() {
   
       let {language} = this.props
       let {detailDoctor, selectTime} = this.state

       let nameVi, nameEn, reversedDate, timeDataVi, timeDataEn, priceVi, priceEn
       let doctorId= ''
       let time = parseInt(selectTime.date)
       let timeData = this.props.location.state.selectTime.timeTypeData
       if (detailDoctor && detailDoctor.positionData)
       {
            nameVi = `${detailDoctor.positionData.valueVi}, ${detailDoctor.lastName} ${detailDoctor.firstName}`
            nameEn = `${detailDoctor.positionData.valueEn}, ${detailDoctor.firstName} ${detailDoctor.lastName}`

       }

       if (time !== undefined)
       {
           reversedDate = language === LANGUAGES.VI ? moment.unix(+ time/1000).format('dddd - DD/MM/YYYY') : 
           moment.unix(+ time/1000).locale('en').format('ddd - MM/DD/YYYY') 
       }

       if (timeData)
       {
            timeDataVi = `${timeData.valueVi}`
            timeDataEn = `${timeData.valueEn}`
       } 

       if (detailDoctor && detailDoctor.Doctor_Infor && detailDoctor.Doctor_Infor.priceTypeData)
       {
            priceVi = `${detailDoctor.Doctor_Infor.priceTypeData.valueVi}` 
            priceEn = `${detailDoctor.Doctor_Infor.priceTypeData.valueEn}` 
       }

       doctorId = (selectTime && _.isEmpty(selectTime)) ? selectTime.doctorId : ''

     
        return (
            <>
       
                <HomeHeader/>

                     
               {/* <LoadingOverlay
                    active={this.state.isShow}
                    spinner
                    text='Loading your content...'
                > */}
                <div className='booking-schedule-container'>
                    <div className='intro-infor'>
                        <div className='content-left'></div>
                        <div className='content-center'>
                            <div className='avatar'   style = {{backgroundImage: `url(${detailDoctor && detailDoctor.image ? detailDoctor.image : ''})`}}  ></div>
                            <div className='content-doctor'>
                                <div className='title-info'><FormattedMessage id="patient.booking-schedule.title"/></div>
                                <div className='doctor-info'>{language === LANGUAGES.VI ? nameVi : nameEn}</div>
                                <div className='time-info'> {language === LANGUAGES.VI ? timeDataVi + ", " : timeDataEn + ","} {reversedDate}</div>
                            </div>
                        </div>
                        <div className='content-right'> </div>
                    </div>
                    <div className='content-booking'>
                        <div className='book-name'>
                            <span className='book-name-icon'>
                                <i className="fas fa-users"></i>
                            </span>
                            <input className='book-name-input'
                                placeholder='Họ tên bệnh nhân (bắt buộc)'
                                value={this.state.fullName}
                                onChange= {(event) => this.handleOnChangeInput(event,'fullName')}
                            />  
                        </div>

                        <div className='note'><FormattedMessage id="patient.booking-schedule.more-name"/> Trần Văn Phú</div>

                        <div className='book-phone'>
                            <span className='phone-icon'>
                                <i className="fas fa-phone"></i>
                            </span>
                            <input className='phone-input'
                                placeholder='Số điện thoại'
                                value={this.state.phoneNumber}
                                onChange= {(event) => this.handleOnChangeInput(event,'phoneNumber')}
                            />  
                        </div>

                        <div className='book-email'>
                            <span className='email-icon'>
                                 <i className="fas fa-envelope-open"></i>
                            </span>
                            <input className='email-input'
                                placeholder='Địa chỉ Email'
                                value={this.state.email}
                                onChange= {(event) => this.handleOnChangeInput(event,'email')}
                            />  
                        </div>


                        <div className='book-contact'>
                            <span className='contact-icon'>
                                <i className="fas fa-users"></i>
                            </span>
                            <input className='contact-input'
                                placeholder='Địa chỉ liên hệ'
                                value={this.state.address}
                                onChange= {(event) => this.handleOnChangeInput(event,'address')}
                            />  
                        </div>

                        <div className='book-reason'>
                            <span className='reason-icon'>
                                 <i className="fas fa-map-marker-alt"></i>
                            </span>
                            <input className='reason-input'
                                placeholder='Lý do khám'
                                value={this.state.reason}
                                onChange= {(event) => this.handleOnChangeInput(event,'reason')}
                            />  
                        </div>

                        <label className='gender-title'><i className="fas fa-venus" ><FormattedMessage id="patient.booking-schedule.title-date"/></i></label> 
                        <div className='book-who'>
                            <DatePicker
                                onChange= {this.handleOnchangeDataPicker}
                                className = 'form-control'
                                value={this.state.currentDate}
                            />
                        </div>

                        <label className='gender-title'><i className="fas fa-venus"><FormattedMessage id="patient.booking-schedule.title-gender"/></i></label> 
                        <div className='book-gender'>
                            <Select 
                                value = {this.state.selectedGender}
                                options={this.state.genders}
                                onChange={this.handleChangeSelect}
                            />
                        </div>

                        <div className='payment-title'> <FormattedMessage id="patient.booking-schedule.payment"/> </div>

                        <div className='payment-detail'>
                           
                            <div className='payment-detail-up'>

                                <div className='left'><FormattedMessage id="patient.booking-schedule.price"/></div>
                                <div className='right'> 
                                
                            {language === LANGUAGES.VI &&
                            
                            
                            <NumberFormat 
                                value={priceVi} 
                                displayType = {'text'} 
                                thousandSeparator={true} 
                                suffix={'VND'}/>
                            }
                            {language === LANGUAGES.EN &&

                            <NumberFormat 
                                value={priceEn} 
                                displayType = {'text'} 
                                thousandSeparator={true} 
                                suffix={'$'}/>
                            }
                            </div>
                                <br/>
                                <div className='left'><FormattedMessage id="patient.booking-schedule.fee-book"/></div>
                                <div className='right'><FormattedMessage id="patient.booking-schedule.fee-book-price"/></div>
                            </div>
                            
                            <div className='payment-detail-down'>
                                <div className='left'><FormattedMessage id="patient.booking-schedule.sum"/></div>
                                <div className='right free'>

                                {language === LANGUAGES.VI &&
                            
                            
                                <NumberFormat 
                                    value={priceVi} 
                                    displayType = {'text'} 
                                    thousandSeparator={true} 
                                    suffix={'VND'}/>
                                }
                                {language === LANGUAGES.EN &&

                                <NumberFormat 
                                    value={priceEn} 
                                    displayType = {'text'} 
                                    thousandSeparator={true} 
                                    suffix={'$'}/>
                                }
                                </div>
                            </div>
                                
                        </div>

                        <div className='idea' style={{width: '50%'}}><FormattedMessage id="patient.booking-schedule.more-book"/></div>

                        <div className='detail-note'>
                            <div style={{marginTop: '10px', fontWeight: '600', textTransform: 'uppercase'}}><FormattedMessage id="patient.booking-schedule.note"/></div>
                            <div style={{marginTop: '10px'}}><FormattedMessage id="patient.booking-schedule.more-note-up"/></div>
                            <ul>
                                <li style={{marginTop: '10px'}}><FormattedMessage id="patient.booking-schedule.more-note-center"/> <span style={{ fontWeight: '600'}}>Trần Văn Phú</span>  </li>
                                <li style={{marginTop: '5px'}}><FormattedMessage id="patient.booking-schedule.more-note-down"/> </li>
                            </ul>
                         
                        </div>
           
                        <button className='btn-confirm' onClick={() => this.handleConfirmBooking()}> <FormattedMessage id="patient.booking-schedule.submit"/></button>

                        <div style={{width: '50%', marginTop: '20px', fontSize: '11px', marginBottom:'10px', textAlign: 'center'}}><FormattedMessage id="patient.booking-schedule.more-submit"/></div>
                    </div>

                    {/* <div className='test'>
                    <DoctorProfile 
                        detailDoctor = {detailDoctor}
                        doctorId = {selectTime.doctorId}
                    />
                  </div> */}
                    
                </div>
              
                <HomeFooter/>

                {/* </LoadingOverlay> */}
            
            </>
         
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,  
        topDoctor: state.admin.topDoctor,
        genders: state.admin.genders,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchGenders: () => dispatch(actions.getGenderStart()),
    };
};

export default  connect(mapStateToProps, mapDispatchToProps)(BookingSchedule);
