import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import Specialty from './Section/Specialty';
import MedicalFacility from './Section/MedicalFacility';
import './HomePage.scss'
import ProminentDoctor from './Section/ProminentDoctor';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Guidebook from './Section/Guidebook'
import About from './Section/About'
import HomeFooter from './HomeFooter'
import Information from './Section/Information'
class HomePage extends Component {
    // handleChangeAfter = () =>
    // {

    // }
    render() {
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
                <HomeHeader isShowBanner={true}/>
                <Specialty 
                    settings = {settings}
                />
                <MedicalFacility 
                    settings = {settings}
                />
                <ProminentDoctor 
                    settings = {settings}
                />
                <Guidebook 
                    settings = {settings}
                />
                <About/>
                <Information/>
                <HomeFooter/>

           </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        user: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
