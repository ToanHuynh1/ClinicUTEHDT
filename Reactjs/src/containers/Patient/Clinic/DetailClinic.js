import React, { Component } from 'react';
import { Fragment } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import './DetailClinic.scss'
import HomeHeader from '../../HomePage/HomeHeader';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorMoreInfor from '../Doctor/DoctorMoreInfor';
import DoctorProfile from '../Doctor/DoctorProfile';
import {getDetailSpecialty, getAllCodeService, getAllClinicById} from '../../../services/userService'
import _ from 'lodash'
import { LANGUAGES } from '../../../utils';
import { Modal } from 'reactstrap';
import ModalReviewSpecialty from '../Specialty/ModalReviewSpecialty'
import ModalReviewClinic from './ModalReviewClinic';

class DetailClinic extends Component {

    constructor(props)
    {
        super(props)
        this.state = {
            arrDoctorId: [],
            dataDetailClinic: {},
            isOpen: false,
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id)
        {
            let id = this.props.match.params.id

            let response = await getAllClinicById({
                id: id,
            })

            if (response && response.infor.errCode === 0)
            {
                let data = response.infor.result
                let arrDoctorId = []
                if (data && !_.isEmpty(response.infor.result))
                {
                    let arr = data.doctorClinic

                    if (arr && arr.length > 0)
                    {
                        arr.map(item => {
                            arrDoctorId.push(item.doctorId)
                        })
                    }
                }
            
                this.setState({
                    dataDetailClinic: response.infor.result,
                    arrDoctorId: arrDoctorId,
                })
            }
        }
    }



    async componentDidUpdate(prevProps,prevState,snapshot){
     
    }
    handleOpenReviewClinic = () => {
        this.setState({
            isOpen: true
        })
    }

    toggleClinicModal = () =>{
        this.setState({
            isOpen: !this.state.isOpen,
       })
    }

    render() {
        let {arrDoctorId, dataDetailClinic, rating} = this.state

        let id = this.props.match.params.id

        let {language} = this.props

        return (
            <div className='detail-specialty-container'>  
                <HomeHeader isOpenMenu = {false}/>
                <br></br>

                <div className='detail-specialty-body'> 
                    
                    <div className='description-specialty'>
                        {dataDetailClinic && dataDetailClinic.descriptionHTML && (
                            <div>
                                <div style={{textAlign: 'center', marginTop: '20px', marginBottom: '30px', fontSize: '25px', fontWeight: '600',
                                color: 'red'
                            }}>{dataDetailClinic.name}</div>
                                <div dangerouslySetInnerHTML={{__html: dataDetailClinic.descriptionHTML }}></div>
                            </div>
                        )
                           
                        }
                    </div>

                    <button className='review-specialty' onClick={()=> this.handleOpenReviewClinic()}>Đánh giá</button>

                    <ModalReviewClinic 
                        isOpen = {this.state.isOpen}
                        toggleFromParent = {this.toggleClinicModal}
                        idClinic = {id}
                    />


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

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
