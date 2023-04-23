import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import {getAllCodeService} from '../../../services/userService'
import {LANGUAGES, CRUD_ACTIONS, CommonUtils} from '../../../utils'
import Lightbox from 'react-image-lightbox';
import * as actions from '../../../store/actions/index'
import './UserRedux.scss'
import 'react-image-lightbox/style.css'
import { disposeEmitNodes } from 'typescript';
import TableUser from './TableUser';
class UserRedux extends Component {

    constructor(props){
        super(props);
        this.state = {
            arrGender: [],
            arrPositon: [],
            arrRole: [],
            imgURL: [],
            isOpen: false,
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            gender: '',
            address: '',
            position: '',
            role:'',
            img: '',
            actions: '', 
            editId: '',
        }
    }

    async componentDidMount() {
        this.props.fetchGenderStart()
        this.props.fetchPositionStart()
        this.props.fetchRoleStart()
    }

    componentDidUpdate(prevProps,prevState, snapshot)
    {
        // hiện tại : this.props
        // quá khứ (prev)
        
        if (prevProps.genderData !== this.props.genderData)
        {
            let genders = this.props.genderData
            
            this.setState({
                arrGender: genders,
                gender: genders && genders.length > 0 ? genders[0].keyMap : ''
            })
        }
        if (prevProps.roleData !== this.props.roleData)
        {
            let roles = this.props.roleData
            
            this.setState({
                arrRole: roles,
                role: roles && roles.length > 0 ? roles[0].keyMap: ''
            })
        }
        if (prevProps.positionData !== this.props.positionData)
        {
            let positions = this.props.positionData
            this.setState({
                arrPositon: positions,
                position: positions && positions.length > 0 ? positions[0].keyMap: ''

            })
        }
        if (prevProps.usersList !== this.props.usersList)
        {
            const stateCoppy = {...this.state}
            stateCoppy['actions'] = CRUD_ACTIONS.CREATE
            this.setState({
                ...stateCoppy
            })
        }
    }


    onChangeImage = async (event) => {
        let data = event.target.files
        let file = data[0]
        if (file) {
            let base64 = await CommonUtils.getBase64(file)
            let obUrl = URL.createObjectURL(file)
            this.setState({
                imgURL: obUrl,
                img: base64
            })
        }  
    }


    resetState = () =>
    {
        let positions = this.props.positionData
        let roles = this.props.roleData
        let genders = this.props.genderData

        this.setState({
            position: positions && positions.length > 0 ? positions[0].keyMap : '',
            role: roles && roles.length > 0 ? roles[0].keyMap: '',
            gender: genders && genders.length > 0 ? genders[0].keyMap: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            img: '',
            imgURL: ''
        })
    }
    openImage = () =>
    {
        if (!this.state.imgURL) return
        this.setState({
            isOpen:true,
        })
    }

    saveUser = () =>
    {
        let checkFlag = this.checkInput()

        let actions = this.state.actions
        if (checkFlag === false) return;
        if (actions == CRUD_ACTIONS.CREATE)
        {
            this.props.createNewUser({
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phoneNumber: this.state.phoneNumber,
                gender: this.state.gender,
                role: this.state.role,
                position: this.state.position,
                image: this.state.img
            })
                this.resetState()
            }
            if (actions === CRUD_ACTIONS.EDIT)
            {
                this.props.editUser({
                    id: this.state.editId,
                    email: this.state.email,
                    password: this.state.password,
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    address: this.state.address,
                    phonenumber: this.state.phoneNumber,
                    gender: this.state.gender,
                    role: this.state.role,
                    position: this.state.position,
                    img: this.state.img
                })
                this.resetState()
            }
    
       
     
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

    checkInput  = () => 
    {
        let checkFlag = true
        let checkArr = ['email', 'password', 'firstName', 'lastName', 'phoneNumber', 'address']
        for(let i = 0 ; i < checkArr.length; i++)
        {
            if (!this.state[checkArr[i]])
                {
                    checkFlag = false
                    alert('Lack of worth : ' + checkArr[i])
                    break
                }
        }

        return checkFlag
 
    }

    handleEditUser = (data) => 
    {
        let imageBase64 = ''
        if (data.image)
        {
            imageBase64 = new Buffer(data.image, 'base64').toString('binary')
        }
        this.setState(
        {
            position: data.positionId,
            role: data.roleId,
            gender:data.gender,
            email: data.email,
            password: 'ABCDEF',
            firstName: data.firstName,
            lastName: data.lastName,
            phoneNumber: data.phonenumber,
            address: data.address,
            img: '',
            imgURL: imageBase64,
            actions: CRUD_ACTIONS.EDIT,
            editId: data.id
        })
    }
    render() {
        let dataGender = this.state.arrGender
        let language = this.props.language
        let dataPosition = this.state.arrPositon
        let dataRole = this.state.arrRole
        let {email, password, firstName, lastName, phoneNumber, gender, position, role, address, img} = this.state
        
        return (
           
            <div className='user-redux-container'>
                <div className='title my-4'>
                    <FormattedMessage id ="manage-user.add"/>
                </div>
           
                <div className="user-redux-body">
                    <div className='container'>
                        <div className='row'>
                            {/* <div className='col-12 my-2'>{genderLoading===true ? 'Loading Genders' : ''}</div> */}
                            <div className='col-3'>
                                <label><FormattedMessage id ="manage-user.email"/></label>
                                <input className='form-control' type='email' 
                                    value={email}
                                    onChange= {(event) => this.onChangeInput(event, 'email')}
                                    disabled={this.state.actions === CRUD_ACTIONS.EDIT ? true: false}
                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id ="manage-user.password"/></label>
                                <input className='form-control' type='password'
                                    value={password}
                                    onChange= {(event) => this.onChangeInput(event, 'password')}
                                    disabled={this.state.actions === CRUD_ACTIONS.EDIT ? true: false}
                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id ="manage-user.firstName"/></label>
                                <input className='form-control' type='text'
                                    value={firstName}
                                    onChange= {(event) => this.onChangeInput(event, 'firstName')}
                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id ="manage-user.lastName"/></label>
                                <input className='form-control' type='text'
                                    value={lastName}
                                    onChange= {(event) => this.onChangeInput(event, 'lastName')}

                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id ="manage-user.phoneNumber"/></label>
                                <input className='form-control' type='text'
                                    value={phoneNumber}
                                    onChange= {(event) => this.onChangeInput(event, 'phoneNumber')}
                                />
                            </div>
                            <div className='col-9'>
                                <label><FormattedMessage id ="manage-user.address"/></label>
                                <input className='form-control' type='text'
                                    value={address}
                                    onChange= {(event) => this.onChangeInput(event, 'address')}
                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id ="manage-user.gender"/></label>
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
                            <div className='col-3'>
                                <label><FormattedMessage id ="manage-user.position"/></label>
                                <select className="form-control"
                                    onChange= {(event) => this.onChangeInput(event, 'position')}
                                    value={position}
                                >
                                    {dataPosition && dataPosition.length > 0 && 
                                        dataPosition.map((position, index) => {
                                            return(
                                                <option key={index} value={position.keyMap}>{language === LANGUAGES.VI ? position.valueVi :  position.valueEn}</option>
                                            )
                                        })
                                    }
                            </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id ="manage-user.role"/></label>
                                <select className="form-control"
                                    onChange= {(event) => this.onChangeInput(event, 'role')}
                                    value={role}
                                >
                                    {dataRole && dataRole.length > 0 && 
                                        dataRole.map((role, index) => {
                                            return(
                                                <option key={index} value={role.keyMap}>{language === LANGUAGES.VI ? role.valueVi :  role.valueEn}</option>
                                            )
                                        })
                                    }
                            </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id ="manage-user.image"/></label>
                                <div className='img-container'>
                                    <input id='imgAdmin' type='file' hidden onChange={(event) => this.onChangeImage(event)}></input>
                                    <label className='upload_custom' htmlFor='imgAdmin'>Tải ảnh <i className="fas fa-upload"></i></label>
                                    <div className='image-admin'
                                        style = {{backgroundImage: `url(${this.state.imgURL})`}}
                                        onClick = {() => this.openImage()}
                                    >
                                        
                                    </div>
                                </div>
    
                            </div>
                            <div className='col-12 my-3'>
                                <button className={this.state.actions == CRUD_ACTIONS.EDIT ? 'btn btn-warning' : 'btn btn-primary'}  
                                    onClick={() => this.saveUser()}
                                >
                                {this.state.actions == CRUD_ACTIONS.EDIT ? 
                                    <FormattedMessage id ="manage-user.edit"/> :
                                    <FormattedMessage id ="manage-user.save"/>
                                }
                                </button>
                            </div>   
                            <div className='col-12 mb-5'>
                                <TableUser 
                                handleEditUserKey = {this.handleEditUser}
                                actions = {this.state.actions}
                                />
                            </div>
                        </div>
                    </div>
                </div>
       
                {this.state.isOpen === true && 
                    <Lightbox
                        mainSrc={this.state.imgURL}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                }
                </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderData: state.admin.genders,
        genderLoading: state.admin.genderLoading,
        roleData: state.admin.roles,
        positionData: state.admin.positions,
        usersList: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchPositionStart: () => dispatch(actions.getPositonStart()),
        fetchRoleStart: () => dispatch(actions.getRoleStart()),
        fetchGenderStart : () => dispatch(actions.getGenderStart()),
        createNewUser: (data) => dispatch(actions.createNewUser(data)),
        getUser: () => dispatch(actions.getAllUserStart()),
        editUser: (data) => dispatch(actions.editUser(data))


        // processLogout: () => dispatch(actions.processLogout()),
        // changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
