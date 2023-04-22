import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManageSchedule.scss'
import { FormattedMessage } from 'react-intl';
import Select from 'react-select';
import * as actions from '../../../store/actions/index'
import { LANGUAGES, dateFormat } from '../../../utils';
import DatePicker from '../../../components/Input/DatePicker';
import { toast } from 'react-toastify';
// format ngày tháng năm
import moment from 'moment';
import _ from 'lodash'
import {saveInforBulkDoctor} from '../../../services/userService'

class ManageSchedule extends Component {
    constructor(props){
        super(props) 
        this.state = {
            listDoctors: [],
            selectedDoctor: {},
            currentDate: '',
            allTime: []
        }
    }
    handleChangeSelected = async (selectedOption) => {
        this.setState({ selectedDoctor: selectedOption});
       
    };

    componentDidMount(){
        this.props.getAllDoctors()
        this.props.getAllScheduleTimes()
    }

    componentDidUpdate(prevProps,prevState,snapshot){
        if (prevProps.allDoctors !== this.props.allDoctors)
        {
            let dataSelected = this.builDataInputSelect(this.props.allDoctors)
            this.setState({
                listDoctors: dataSelected
            })

        }

    //    if (prevProps.language !== this.props.language)
    //    {
    //         let dataSelected = this.builDataInputSelect(this.props.allDoctors)
    //         this.setState({
    //             listDoctors: dataSelected
    //         })
    //    }

        if (prevProps.allDataTime !== this.props.allDataTime)
        {

            let data = this.props.allDataTime
            if (data && data.length> 0)
            {
             
                data = data.map(item => ({ ...item, isSelected: false}))
            }
            this.setState({
                allTime: data
            })
        }
    }

    builDataInputSelect = (dataInput) =>
    {
        let result = []
        let {language} = this.props
        if (dataInput && dataInput.length > 0)
        {
            dataInput.map((item, index) => {
                let obj = {}
                let labelVi = `${item.lastName} ${item.firstName}`
                let labelEn = ` ${item.firstName} ${item.lastName}`
                obj.label = language === LANGUAGES.VI ? labelVi : labelEn
                obj.value = item.id
                result.push(obj)
            })
        }
        return result
    }


    handleOnchangeDataPicker = (dateSelect) => 
    {
        this.setState({
            currentDate: dateSelect[0]
        })
    }


    handleSeclectBtnTime = (data) => 
    {
        let {allTime} = this.state
        if (allTime && allTime.length > 0) 
        {
            allTime = allTime.map((item,index) => 
            {

                if (item.id === data.id) 
                {
                    item.isSelected = !item.isSelected
                }
                return item
             })
            

            this.setState({
                allTime: allTime
            })
        }
    }

    handleSaveSchedule = async () => {
        let {allTime, selectedDoctor, currentDate} = this.state
        let result = []
        // sử dụng moment để format date
        if (!currentDate)
        {
            toast.error('Missing date !!!')
            return;
        }

        //  '_.isEmplty' check rỗng sử dụng lodash
        if (selectedDoctor && _.isEmpty(selectedDoctor))
        {
            toast.error('No doctor selected !!!')
            return;
        }

        // let dataFormat = moment(currentDate).format(dateFormat.SEND_TO_SERVER)

      

        let dataFormat = new Date(currentDate).getTime()

        if (allTime && allTime.length > 0 )
        {
            let selectedTime = allTime.filter((item,index) => 
            
                item.isSelected === true
            )
            if (selectedTime && selectedTime.length > 0)
            {
                selectedTime.map((item, index) => 
                {
                    let obj = {}
                    obj.doctorId = selectedDoctor.value
                    obj.doctorId = selectedDoctor.value
                    obj.date = dataFormat
                    obj.timeType = item.keyMap
                    result.push(obj)
                })
               
            }
            else
            {
                toast.error('No time selected !!!')
                 return;
            }
        }   
        
        let res = await saveInforBulkDoctor({
            scheduleArr: result,
            doctorId: selectedDoctor.value,
            date: dataFormat
        })

        if (res && res.errCode === 0)
        {
            toast.success("Save success")
        }
        else
        {
            toast.error("Save error")
        }
       
    }
    render() {
        let {allTime, currentDate} = this.state
        let {language} = this.props
        let yesterday = new Date(new Date().setDate(new Date().getDate()-1));

        return (
            <div className='manage-schedule-container'>
               <div className='manage-schedule-title'>
                    <FormattedMessage id="manage-schedule.title"/>
               </div>
               <div className='container'>
                    <div className='row'>
                        <div className='col-6 form-group' >
                            <label style={{fontSize: '17px', fontWeight: '600'}}><FormattedMessage id="manage-schedule.select-doctor"/></label>
                            <Select 
                            onChange={this.handleChangeSelected}
                            options={this.state.listDoctors}
                            value={this.state.selectedDoctor}
                            />
                        </div>
                        <div className='col-6 form-group' >
                            <label style={{fontSize: '17px', fontWeight: '600'}}><FormattedMessage id="manage-schedule.select-day"/></label>
                            <DatePicker
                                onChange= {this.handleOnchangeDataPicker}
                                className = 'form-control'
                                value={this.state.currentDate}
                                // minDate tối thiểu
                                minDate={yesterday}
                            />
                        </div>
                    </div> 
                    <div className='col-12 select-time-container'>
                        {allTime && allTime.length > 0 && allTime.map((item,index) => 
                        {
                            return(
                                <button className={item.isSelected == true ? 'btn btn-schedule active' : 'btn btn-schedule'} key={index} 
                                    onClick = {() => this.handleSeclectBtnTime(item)}
                                >
                                    {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                </button>
                            ) 
                        })}
                    </div>
                    <div className='col-12'>
                        <button className='btn-primary mt-3 btn-submit-schedule' onClick={() => this.handleSaveSchedule()}><FormattedMessage id="manage-schedule.save-inforSchedule"/></button>
                    </div>
               </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        allDoctors: state.admin.allDoctors,
        allDataTime: state.admin.allDataTime 
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllDoctors: () => dispatch(actions.getAllDoctors()),
        getAllScheduleTimes: () => dispatch(actions.getAllScheduleTimes()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
