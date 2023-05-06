import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";
import './Specialty.scss'
import { getAllSpecialty } from '../../../services/userService';
import { withRouter } from 'react-router';

class Specialty extends Component {

    constructor(props)
    {
        super(props)
        this.state = {
            dataSpecialty: []
        }
    }

    async  componentDidMount(){
        let data = await getAllSpecialty()
        if (data.infor.errCode === 0)
        {
            this.setState({
                dataSpecialty: data.infor.data ? data.infor.data : []
            })
        }
    }
   
    handleViewDetailSpecialy = (data) => {
        this.props.history.push(`/detail-specialty/${data.id}`)  
    }

    SwitchSeeAllSpecialtyFromSpecialty = () => {
        this.props.history.push(`/see-all-specialty`)  
    }

    handleTest = () => {
        this.props.func_testClick(true)
    }
    hanClickClose = () => {
        this.props.handleClickCloseMenu()
    }
   
    render() {
        let {dataSpecialty} = this.state
        return (
        <div className='section-share section-specialty' onClick={() => this.hanClickClose()}>
            <div className='section-container' >
                <div className='section-header'>
                    <span className='title-section'><FormattedMessage id="homepage.speciality"/></span>
                    <button className='btn-section' onClick={() => this.SwitchSeeAllSpecialtyFromSpecialty()}><FormattedMessage id="homepage.more-inf"/></button>
                </div>
                <div className='section-body'>
                    <Slider {...this.props.settings} >
                        {dataSpecialty && dataSpecialty.length > 0 && dataSpecialty.map((item, index) => {
                            return(
                                <div className='section-customize' 
                                key={index}
                                onClick= {() => this.handleViewDetailSpecialy(item)}
                                >
                                    <div className='bg-image section-specialty'
                                     style = {{backgroundImage: `url(${item.image})`}}
                                    >
        
                                    </div>
                                    <div className='specialty-name text-center' >{item.name}</div>
                                </div>
                            )
                        })}
                     
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
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default  withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));
