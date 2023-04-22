import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorMoreInfor.scss'
import {getMoreInfoDoctorById, getTimeOfDoctorByDate} from '../../../services/userService'
import { LANGUAGES } from '../../../utils';
import Select from 'react-select'
import { FormattedMessage } from 'react-intl';
import NumberFormat from 'react-number-format';

class DoctorMoreInfor extends Component {

    constructor(props)
    {
        super(props)
        this.state = {
          isShowDetailInfo: true,
          moreInfor: {}
        }
    }

    async componentDidMount() {

        if (this.props.doctorIdParent)
        {

            let data = await getMoreInfoDoctorById(this.props.doctorIdParent)
                
            if (data &&  data.errCode == 0) {
                this.setState({
                    moreInfor: data.data
                })
            }
        }

    }

    async componentDidUpdate(prevProps,prevState,snapshot){
        if (this.props.language !== prevProps.language)
        {
           
        }

        if (prevProps.doctorIdParent !== this.props.doctorIdParent)
        {
            let data = await getMoreInfoDoctorById(this.props.doctorIdParent)
            
            if (data &&  data.errCode == 0) {
                this.setState({
                    moreInfor: data.data
                })
            }
        }

      
    }

    handleShowMoreInfoDoctor = (check) => {
        this.setState({
            isShowDetailInfo: check
        })
    }
    render() {
        let {isShowDetailInfo, moreInfor} = this.state
        let {language} = this.props

        return (
            <div className='doctor-more-infor-container'>
                <div className='content-up'>
                    <div className='more-info-address'>
                        <FormattedMessage id="patient.more-info-doctor.clinic-address"/>
                    </div>
                    <div className='more-info-clinic'>
                        {moreInfor && moreInfor.nameClinic ? moreInfor.nameClinic : ''}
                    </div>
                    <div className='more-info-detail-address'>
                        {moreInfor && moreInfor.addressClinic ? moreInfor.addressClinic : ''}
                    </div>
                </div>
                <div className='content-down'>
                   
                    { isShowDetailInfo === false &&   
                        <div className='basic-price'>
                            <span className='price-basic'> <FormattedMessage id="patient.more-info-doctor.clinic-price"/>:  
                            
                            {moreInfor && moreInfor.priceTypeData && language === LANGUAGES.VI &&
                            
                            
                                <NumberFormat 
                                    value={moreInfor.priceTypeData.valueVi} 
                                    displayType = {'text'} 
                                    thousandSeparator={true} 
                                    suffix={'VND'}/>
                            }
                            {moreInfor && moreInfor.priceTypeData && language === LANGUAGES.EN &&

                                <NumberFormat 
                                    value={moreInfor.priceTypeData.valueEn} 
                                    displayType = {'text'} 
                                    thousandSeparator={true} 
                                    suffix={'$'}/>
                            }
                            </span>

                            <span className='see-more-info' onClick={() => this.handleShowMoreInfoDoctor(true)}><FormattedMessage id="patient.more-info-doctor.see-info"/></span> 
                        </div>
                    }

                    {
                    isShowDetailInfo === true && 
                        <>
                            <div className='title-detail-top'><FormattedMessage id="patient.more-info-doctor.clinic-price"/>: .</div>
                            <div className='detail-infor'>
                                <div>
                                    <span className='left'><FormattedMessage id="patient.more-info-doctor.clinic-price"/>:</span>
                                    <span className='right'>
                                    {moreInfor && moreInfor.priceTypeData && language === LANGUAGES.VI &&
                            
                            
                                        <NumberFormat 
                                            value={moreInfor.priceTypeData.valueVi} 
                                            displayType = {'text'} 
                                            thousandSeparator={true} 
                                            suffix={'VND'}/>
                                    }
                                    {moreInfor && moreInfor.priceTypeData && language === LANGUAGES.EN &&

                                        <NumberFormat 
                                            value={moreInfor.priceTypeData.valueEn} 
                                            displayType = {'text'} 
                                            thousandSeparator={true} 
                                            suffix={'$'}/>
                                    }       
                                    </span>
                                </div>
                                <div className='note'>
                                    {moreInfor && moreInfor.note ? moreInfor.note : ''}
                                </div>
                                <div className='detail-payment'>
                                    <FormattedMessage id="patient.more-info-doctor.info-clinic"/>:   
                                    { moreInfor && moreInfor.paymentTypeData && language === LANGUAGES.VI ? moreInfor.paymentTypeData.valueVi : '' }
                                    { moreInfor && moreInfor.paymentTypeData && language === LANGUAGES.EN ? moreInfor.paymentTypeData.valueEn : '' }
                                </div>
                            </div>
                           
                            <div className='close-detail' onClick={() => this.handleShowMoreInfoDoctor(false)}><FormattedMessage id="patient.more-info-doctor.close-detail"/></div>
                        </>
                     }   
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorMoreInfor);
