import React, { Component } from 'react';
import { Fragment } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import './UpdateInfor.scss'
import HomeHeader from '../../HomePage/HomeHeader';
import {updateInforPatient, handleGetUserById} from '../../../services/userService'
import _ from 'lodash'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import moment from 'moment';
import { LANGUAGES } from '../../../utils';
import { withRouter } from 'react-router';
import { toast } from 'react-toastify';
import * as actions from '../../../store/actions/index'


class UpdateInfor extends Component {

    constructor(props)
    {
        super(props)
        this.state = {
            isOpenUpdate: false,
            firstName: '',
            phoneNumber: '',
            gender: '',
            address: '',
            arrGender: [],
            id: ''
        }
    }

    async componentDidMount() {
        this.props.fetchGenderStart()

        let {userInfo} = this.props

        if (userInfo)
        {
            let reponse = await handleGetUserById({
                id: userInfo.id
            })

            if (reponse && reponse.data.errCode === 0){
                let data = reponse.data.user

                this.setState({
                    firstName: data.firstName ? data.firstName: '',
                    phoneNumber: data.phonenumber ? data.phonenumber: '',
                    address: data.address ? data.address: '',
                    gender: data.gender ? data.gender : '',
                    id: data.id ? data.id : ''
                })
            }
            
        }    

    }

    handleExcuteUpdateInfo = async () => {
        let reponse = await updateInforPatient({
            id: this.state.id,
            address: this.state.address,
            phonenumber: this.state.phoneNumber,
            gender: this.state.gender,
            firstName: this.state.firstName
        })

        if (reponse && reponse.errCode === 0)
        {
            toast.success("Cập nhật thông tin thành công! ");
            setTimeout(() => {
              this.props.history.push(`/home`);
            }, 3000);
        }
        else
        {
            toast.error("Cập nhật thông tin thất bại! ")
        }
    }


    async componentDidUpdate(prevProps,prevState,snapshot){
        if (prevProps.genderData !== this.props.genderData)
        {
            let genders = this.props.genderData
            
            this.setState({
                arrGender: genders,
                gender: genders && genders.length > 0 ? genders[0].keyMap : ''
            })
        }
    }

    
    closeUpdateInfor = () => {
        this.props.history.push(`/home`)
    }

    handleOpenUpdateInfo = (data) => {
        this.setState({
            isOpenUpdate: data
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


    render() {
        let dataGender = this.state.arrGender

        let language = this.props.language

        let {email, firstName, phoneNumber, gender, address} = this.state

        return (
            <>
            <HomeHeader isShowBanner={false}/>
                <div className='update-infor-patient'>  
                    <div className='custom-update'>
                        <div className='title-update'><FormattedMessage id="homepage.update"/></div>
                        <div className='row'>
                            <div className='col-6 form-group'>
                                <label style={{fontWeight: '600', fontSize: '17px'}}><FormattedMessage id="manage-user.firstName"/></label>
                                <input className='form-control' type='firstName' value={this.state.firstName}
                                        onChange= {(event) => this.onChangeInput(event, 'firstName')}
                                ></input>
                            </div> 

                            <div className='col-6 form-group'>
                                    <label style={{fontWeight: '600', fontSize: '17px'}}><FormattedMessage id="manage-user.phoneNumber"/></label>
                                    <input className='form-control' type='phoneNumber' value={this.state.phoneNumber}
                                        onChange= {(event) => this.onChangeInput(event, 'phoneNumber')}
                                    ></input>
                            </div> 

                            <div className='col-6 form-group' style={{marginTop: '10px'}}>
                                    <label style={{fontWeight: '600', fontSize: '17px'}}><FormattedMessage id="manage-user.address"/></label>
                                    <input 
                                    className='form-control' 
                                    type='address' 
                                    value={this.state.address}
                                    onChange= {(event) => this.onChangeInput(event, 'address')}
                                    ></input>
                            </div> 


                            <div className='col-6' style={{marginTop: '10px'}}>
                                    <label style={{fontWeight: '600', fontSize: '17px'}}><FormattedMessage id="manage-user.gender"/></label>
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
                    
                        <Button className='btn-excute' onClick={() => this.handleExcuteUpdateInfo()}><FormattedMessage id="homepage.update"/></Button>
                        <Button className='btn-cancel' onClick={() => this.closeUpdateInfor()}><FormattedMessage id="homepage.cancel"/></Button>
                    </div>
                </div>
            </>
        )
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UpdateInfor));
