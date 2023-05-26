import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";
import {getSuperClinic} from '../../../services/userService'
import { withRouter } from 'react-router';

class MedicalFacility extends Component {

    constructor(props)
    {
        super(props)
        this.state = {
            dataAllClinic: []
        }
    }


    async componentDidMount() {
        let reponse = await getSuperClinic()

        if (reponse && reponse.infor.errCode ==0)
        {
            this.setState({
                dataAllClinic:  reponse.infor.data ? reponse.infor.data: []
            })
        }
    }

    handleViewDetailClinic = (data) => {
        this.props.history.push(`/detail-clinic/${data.id}`)  
    }

    handleSwtichSeeAllClinicFromMedical = () => {
        this.props.history.push(`/see-all-clinic`)  
    }

    hanClickClose = () => {
        this.props.handleClickCloseMenu()
    }
   
    render() {
        let {dataAllClinic} =  this.state
        return (
            <div className='section-share section-medical-facility' onClick={() => this.hanClickClose()}>
            <div className='section-container'>
                <div className='section-header'>
                    <span className='title-section'><FormattedMessage id="homepage.outstandingfacility"/></span>
                    <button className='btn-section' onClick={() => this.handleSwtichSeeAllClinicFromMedical()}><FormattedMessage id="homepage.search"/></button>
                </div>
                <div className='section-body'>
                    <Slider {...this.props.settings}>
                        {dataAllClinic && dataAllClinic.length > 0 && 
                            dataAllClinic.map((item,index) => {
                                return(
                                    <div className='section-customize' key={index}
                                    onClick= {() => this.handleViewDetailClinic(item)}

                                    >
                                        <div className='bg-image section-medical-facility'
                                            style = {{backgroundImage: `url(${item.image})`}}
                                        >
            
                                        </div>
                                        <div className='text-center' style={{fontWeight: '600'}}>{item.name}</div>
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
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MedicalFacility));
