import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";
import * as actions from '../../../store/actions'
import { LANGUAGES } from '../../../utils';
import { withRouter } from 'react-router';

class ProminentDoctor extends Component {

    constructor(props)
    {
        super(props)
        this.state = {
            doctorArr: []
        }
    }
    componentDidUpdate(prevProps,prevState, snapshot)
    {
        if (prevProps.topDoctor !== this.props.topDoctor)
        {
            this.setState({
                doctorArr: this.props.topDoctor
            }   
            )
        }
    }
    componentDidMount()
    {
        this.props.loadSuperDoctors()
    }

    handleViewDetailDoctor = (doctor) => 
    {
        this.props.history.push(`/detail-doctor/${doctor.id}`)
    }

    handleSwitchMoreInfoDoctor = () => {
        this.props.history.push(`/see-all-doctor`)
    }

    hanClickClose = () => {
        this.props.handleClickCloseMenu()
    }
    render() {

        let topDoctorArr = this.state.doctorArr
   
        let {language} = this.props
        return (
            <div className='section-share section-prominent-doctor'  onClick={() => this.hanClickClose()}>
            <div className='section-container'>
                <div className='section-header'>
                    <span className='title-section'><FormattedMessage id="homepage.prominent-doctor"/></span>
                    <button className='btn-section' onClick={() => this.handleSwitchMoreInfoDoctor()}><FormattedMessage id="homepage.more-inf"/></button>
                </div>
                <div className='section-body'>
                    <Slider {...this.props.settings}>
                       
                            {
                                topDoctorArr && topDoctorArr.length && topDoctorArr.map((doctor,index) => {
                                    let imageBase64 = ''
                                    if (doctor.image)
                                    {
                                       
                                        imageBase64 = new Buffer(doctor.image, 'base64').toString('binary')
                                    }
                                    let nameVi = `${doctor.positionData.valueVi},${doctor.lastName} ${doctor.firstName} `
                                    let nameEn = `${doctor.positionData.valueEn},${doctor.firstName} ${doctor.lastName}`
                                    return (
                                    <div className='section-customize' key = {index} onClick = {() => this.handleViewDetailDoctor(doctor)}>
                                        <div className='border-custom'>
                                            <div className='outside-bg'>
                                                <div className='bg-image section-prominent-doctor'
                                                     style = {{backgroundImage: `url(${imageBase64})`}}

                                                />
                                            </div>
                                            <div className='position text-center'>
                                                <div style={{fontWeight: '600'}}>{language === LANGUAGES.VI ? nameVi : nameEn}</div>
                                                {doctor.Doctor_Infor.Specialty.name && (
                                                    <div>Chuyên khoa: {doctor.Doctor_Infor.Specialty.name}</div>
                                                )}
                                               
                                             </div>
                                        </div>
                                    </div>
                                    )
                                })
                            }
                       
                    </Slider>
                </div>
            </div>
        </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        topDoctor: state.admin.topDoctor,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadSuperDoctors: () => dispatch(actions.getSuperDoc())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProminentDoctor));
