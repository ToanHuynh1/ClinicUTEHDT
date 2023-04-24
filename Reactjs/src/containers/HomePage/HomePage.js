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
import Information from './Section/Information'
class HomePage extends Component {

    constructor(props)
    {
        super(props)
        this.state = {
            isOpenUpdate: false,
            isOpenSeeBooking: false,
            firstName: '',
            phoneNumber: '',
            gender: '',
            address: '',
            arrGender: [],
        };
    }
    
    componentDidMount = () => {
        this.props.fetchGenderStart()

        let {userInfo} = this.props

        if (userInfo)
        {
            this.setState({
                firstName: userInfo.firstName ? userInfo.firstName: '',
                phoneNumber: userInfo.phoneNumber ? userInfo.phoneNumber: '',
                address: userInfo.address ? userInfo.address: ''
            })
        }

    }

    componentDidUpdate = (prevProps,prevState, snapshot) => {
        if (prevProps.genderData !== this.props.genderData)
        {
            let genders = this.props.genderData
            
            this.setState({
                arrGender: genders,
                gender: genders && genders.length > 0 ? genders[0].keyMap : ''
            })
        }
    }
    handleOpenUpdateInfo = (data) => {
        this.setState({
            isOpenUpdate: data
        })
    }

    handleOpenSeeBooking = (data) => {
        this.setState({
            
        })
    }


    closeUpdateInfor = () => {
        this.setState({
            isOpenUpdate: false
        })
    }

    onChangeInput = (event, id) =>
    {
        let stateCoppy = {...this.state}
        stateCoppy[id] = event.target.value
        this.setState(
            {
                ...stateCoppy
            }
        )
    }

    handleExcuteUpdateInfo = () => {
        alert('update')
    }
    render() {
        let dataGender = this.state.arrGender

        let language = this.props.language

        let {email, firstName, phoneNumber, gender, address} = this.state
        let settings  = {
            dots: false,
            infinite: false,
            speed:  500,
            slidesToShow: 4,
            slidesToScroll: 2, 
            // afterChange: this.handleChangeAfter
        };

        let {isOpenUpdate} = this.state


        return (
           <div>

                <HomeHeader 
                    isShowBanner={isOpenUpdate}
                    handleOpenUpdateInfo = {this.handleOpenUpdateInfo}
                />

                <Modal
                    isOpen = {isOpenUpdate}
                    className={'update-modal-container'}
                    size="md"
                    centered

                >
                <div className="modal-header">
                    <h5 className="modal-title" style={{fontWeight: '600'}}>Cập nhật thông tin cá nhân</h5>
                    <button type="button" className="close" aria-label="Close" onClick={() => this.closeUpdateInfor()}>
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <ModalBody>
                    <div className='row'>
                        <div className='col-6 form-group'>
                                <label>Tên</label>
                                <input className='form-control' type='firstName' value={this.state.firstName}
                                    onChange= {(event) => this.onChangeInput(event, 'firstName')}
                                ></input>
                        </div> 

                        <div className='col-6 form-group'>
                                <label>Số điện thoại</label>
                                <input className='form-control' type='phoneNumber' value={this.state.email}
                                    onChange= {(event) => this.onChangeInput(event, 'phoneNumber')}
                                ></input>
                        </div> 

                        <div className='col-6 form-group'>
                                <label>Địa chỉ</label>
                                <input className='form-control' type='address' value={this.state.email}
                                   onChange= {(event) => this.onChangeInput(event, 'address')}
                                ></input>
                        </div> 


                        <div className='col-6'>
                                <label>Giới tính</label>
                                <select className="form-control"
                                    onChange= {(event) => this.onChangeInput(event, 'gender')}
                                    value={gender}
                                >
                                    {dataGender && dataGender.length > 0 && 
                                        dataGender.map((gender, index) => {
                                            return(
                                                <option key={index} value={gender.keyMap}>{language === LANGUAGES.VI ? gender.valueVi :  gender.valueEn}</option>
                                            )
                                        })
                                    }
            
                            </select>
                            </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => this.handleExcuteUpdateInfo()}>Cập nhật</Button>
                    <Button color="secondary" onClick={() => this.closeUpdateInfor()}>Hủy bỏ</Button>
                </ModalFooter>
                </Modal>
               
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
