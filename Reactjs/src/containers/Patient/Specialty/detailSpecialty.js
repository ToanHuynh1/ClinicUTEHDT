import React, { Component } from 'react';
import { Fragment } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import './detailSpecialty.scss'
import HomeHeader from '../../HomePage/HomeHeader';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorMoreInfor from '../Doctor/DoctorMoreInfor';
import DoctorProfile from '../Doctor/DoctorProfile';
import {getDetailSpecialty, getAllCodeService} from '../../../services/userService'
import _ from 'lodash'
import { LANGUAGES } from '../../../utils';

class detailSpecialty extends Component {

    constructor(props)
    {
        super(props)
        this.state = {
            arrDoctorId: [],
            dataDetailSpecialty: {},
            listProvince: []
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id)
        {
            let id = this.props.match.params.id

            let response = await getDetailSpecialty({
                id: id,
                location: 'ALL'
            })

            let resProvince = await getAllCodeService('PROVINCE')


            if (response && response.infor.errCode === 0)
            {
                let data = response.infor.result
                let arrDoctorId = []
                if (data && !_.isEmpty(response.infor.result))
                {
                    let arr = data.doctorSpecialty

                    if (arr && arr.length > 0)
                    {
                        arr.map(item => {
                            arrDoctorId.push(item.doctorId)
                        })
                    }
                }
                let dataProvince = resProvince.data
                let result = [];
                if (dataProvince && dataProvince.length > 0)
                {
                    dataProvince.unshift({
                        createAt: null,
                        keyMap: 'ALL',
                        updatedAt : null,
                        type: 'PROVINCE',
                        valueEn: 'ALL',
                        valueVi: 'Toàn quốc'
                    })
                }

                result = dataProvince
                this.setState({
                    dataDetailSpecialty: response.infor.result,
                    arrDoctorId: arrDoctorId,
                    listProvince: result ? result : []
                })
            }
        }
    }



    async componentDidUpdate(prevProps,prevState,snapshot){
     
    }


    hanldOnChangeSelect =async (event) =>
    {
        if (this.props.match && this.props.match.params && this.props.match.params.id)
        {
            let location = event.target.value
            let id = this.props.match.params.id


            let response = await getDetailSpecialty({
                id: id,
                location: location
            })

            if (response && response.infor.errCode === 0)
            {
                let data = response.infor.result
                let arrDoctorId = []
                if (data && !_.isEmpty(response.infor.result))
                {
                    let arr = data.doctorSpecialty

                    if (arr && arr.length > 0)
                    {
                        arr.map(item => {
                            arrDoctorId.push(item.doctorId)
                        })
                    }
                }
          

                this.setState({
                    dataDetailSpecialty: response.infor.result,
                    arrDoctorId: arrDoctorId,
                })
            }
        }

    }
    render() {
        let {arrDoctorId, dataDetailSpecialty, listProvince} = this.state

        let {language} = this.props

        console.log(listProvince)
        return (
            <div className='detail-specialty-container'>  
                <HomeHeader/>
                <br></br>

                <div className='detail-specialty-body'> 
            
                    <div className='description-specialty'>
                        {dataDetailSpecialty && dataDetailSpecialty.descriptionHTML &&
                            <div dangerouslySetInnerHTML={{__html: dataDetailSpecialty.descriptionHTML }}></div>
                        }
                    </div>

                    <div className='search-doctor'>
                        <select className='select-province'  onChange={(event) => this.hanldOnChangeSelect(event)}>
                            {listProvince && listProvince.length > 0 && listProvince.map((item, index) => {
                                return(
                                    <option key={index} value={item.keyMap}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                )
                            })}

                        </select>
                    </div>

                    {arrDoctorId && arrDoctorId.length > 0 && arrDoctorId.map((item, index)=> {
                    return (
                    <div className='each-doctor' key={index}>
                        <div className='content-left'>
                            <div className='profile-doctor'>
                                <DoctorProfile
                                    doctorId = {item}
                                />
                            </div>
                        </div>
                        <div className='content-right'>
                            <div className='doctor-schedule'>
                                <DoctorSchedule
                                    key={index}
                                    doctorIdParent={item}
                                    // detailDoctor = {detailDoctor}
                                />
                            </div>
                        
                            <div className='doctor-more-infor'>
                                <DoctorMoreInfor 
                                    doctorIdParent={item}
                                />
                            </div>
                        
                        </div>
                    </div>
                    )
                    })}

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

export default connect(mapStateToProps, mapDispatchToProps)(detailSpecialty);
