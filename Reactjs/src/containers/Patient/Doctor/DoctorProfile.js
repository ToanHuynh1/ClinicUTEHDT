import React, { Component } from 'react';
import { Fragment } from 'react';
import { connect } from "react-redux";
import './DoctorProfile.scss'
import {getProflieDoctorById} from '../../../services/userService'
import _ from 'lodash'
import { withRouter } from 'react-router';
import { LANGUAGES } from '../../../utils';
class DoctorProfile extends Component {

    constructor(props)
    {
        super(props)
        this.state = {
            profileData: {},
            doctorId: ''
        }
    }

    async componentDidMount() {
       
        this.setState({
            doctorId: this.props.doctorId
         })
        let result = {}

        let res = await getProflieDoctorById(this.props.doctorId)

        if (res && res.errCode === 0)
        {
            result = res.data
        }

        if (result)
        {
            this.setState({
                profileData: result
            })
        }
    }   

    getInforDoctor = async (id) => {
        let result = {}
        if (id)
        {
            let res = await getProflieDoctorById(id)
            if (res && res.errCode === 0)
            {
                result = res.data
            }
        }

        return result
    }
    async componentDidUpdate(prevProps,prevState,snapshot){
        // let result = {}
        
        // if (this.props.doctorId !== prevProps.doctorId)
        // {   
        //     this.setState({
        //        doctorId: this.props.doctorId
        //     })
        // }

        // if (this.props.detailDoctor !== prevProps.detailDoctor)
        // {
        //     this.setState({
        //         profileData: this.props.detailDoctor
        //     })
        //     let res = await getProflieDoctorById(this.props.id)
        //     if (res && res.errCode === 0)
        //     {
        //         result = res.data
        //     }

        //     if (result && result.length > 0)
        //     {
        //         this.setState({
        //             profileData: result
        //         })
        //     }
        
        // }

       
    }

    handleModifyPage = () => {
        this.props.history.push(`/detail-doctor/${this.props.doctorId}`)
    }

    render() {
        let {profileData} = this.state
        let {language} = this.props
        let nameVi,nameEn
        
        if (profileData && profileData.positionData)
        {
            nameVi = `${profileData.positionData.valueVi},${profileData.lastName} ${profileData.firstName} `
            nameEn = `${profileData.positionData.valueEn},${profileData.firstName} ${profileData.lastName}`
        }

        console.log(profileData)

        return (
            <div className='profile-doctor-container'>
                <div className='introduction-doctor'>
                    <div className='content-left' >
                        <div className='avt-doctor' style = {{backgroundImage: `url(${profileData && profileData.image ? profileData.image : ''})`}} ></div>
                        <div className='more-intro' onClick={() => this.handleModifyPage()}>Xem thêm</div>
                    </div>
                     
                    <div className='content-right'>
                        <div className='up'>
                            {language === LANGUAGES.VI ? nameVi : nameEn}
                        </div>
                        <div className='down'>
                        {
                            profileData.Markdown &&  profileData.Markdown.description &&
                            <span>
                                { profileData.Markdown.description}
                            </span>
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
        topDoctor: state.admin.topDoctor
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default  withRouter(connect(mapStateToProps, mapDispatchToProps)(DoctorProfile));
