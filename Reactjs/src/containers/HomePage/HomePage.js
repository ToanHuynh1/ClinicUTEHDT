import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import Specialty from './Section/Specialty';
import MedicalFacility from './Section/MedicalFacility';
import './HomePage.scss'
import {LANGUAGES, CRUD_ACTIONS, CommonUtils} from '../../utils'
import ProminentDoctor from './Section/ProminentDoctor';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Guidebook from './Section/Guidebook'
import About from './Section/About'
import * as actions from '../../store/actions/index'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import HomeFooter from './HomeFooter'
import { toast } from 'react-toastify';
import Information from './Section/Information'
import {updateInforPatient, handleGetUserById} from '../../services/userService'
class HomePage extends Component {

    constructor(props)
    {
        super(props)
        this.state = {
            isOpenSeeBooking: false,
            isOpenAllMenu: false,
            isOpen: false
        };
    }
    
    componentDidMount = async () => {

    

    }

    componentDidUpdate = (prevProps,prevState, snapshot) => {
       
    }

    handleClickCloseMenu = (click) => {
 
        this.setState({
            isOpenAllMenu: click
                    
        })
    }

    handleClickCloseUpdate = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })

    }

    render() {
       
        let language = this.props.language

        let settings  = {
            dots: false,
            infinite: false,
            speed:  500,
            slidesToShow: 4,
            slidesToScroll: 2, 
            // afterChange: this.handleChangeAfter
        };

        return (
           <div>
                <HomeHeader 
                    isShowBanner={true}
                    isOpenMenu = {true}
                    isOpen={this.state.isOpen}
                    isOpenAllMenu = {this.state.isOpenAllMenu}
                    handleClickCloseMenu= {this.handleClickCloseMenu}
                />
                <Specialty 
                    settings = {settings}
                    handleClickCloseMenu= {this.handleClickCloseMenu}
                />
                <MedicalFacility 
                    settings = {settings}
                    handleClickCloseMenu= {this.handleClickCloseMenu}
                />
                <ProminentDoctor 
                    settings = {settings}
                    handleClickCloseMenu= {this.handleClickCloseMenu}
                />
                <Guidebook 
                    settings = {settings}
                    handleClickCloseMenu= {this.handleClickCloseMenu}
                />
                <About handleClickCloseMenu= {this.handleClickCloseMenu}/>
                <Information handleClickCloseMenu= {this.handleClickCloseMenu}/>
                <HomeFooter  handleClickCloseMenu= {this.handleClickCloseMenu}/>

           </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
        genderData: state.admin.genders,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchGenderStart : () => dispatch(actions.getGenderStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
