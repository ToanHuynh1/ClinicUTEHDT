import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import _ from 'lodash'
import { toast } from 'react-toastify';
import './ManageClinic.scss'
import Lightbox from 'react-image-lightbox';
import MdEditor from 'react-markdown-editor-lite';
import MarkdownIt from 'markdown-it';
import {CommonUtils, CRUD_ACTIONS} from '../../../utils'
import {createNewClinic, getAllClinic, editClinicService} from '../../../services/userService'
import TableClinic from './TableClinic';
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageClinic extends Component {
    constructor(props)
    {
        // properties: kế thừa các thuộc tính của lớp cha
        super(props)
        this.state = {
            name: '',
            imageBase64: '',
            address: '',
            descriptionHTML: '',
            descriptionMardown: '',
            listClinic: [],
            isOpen: false,
        }
    }

    async componentDidMount() {
        let reponse = await getAllClinic()

        if (reponse && reponse.infor.errCode === 0)
        {
            this.setState({
                listClinic:  reponse.infor.data ? reponse.infor.data : []
            })

        }
    }


    componentDidUpdate(){

    }


    handleOnChangeInput = (event, id) => {
        let stateCoppy = {...this.state}
        stateCoppy[id] = event.target.value
        this.setState({...stateCoppy})
    }

    openImage = () =>
    {
        if (!this.state.imgURL) return
        this.setState({
            isOpen:true,
        })
    }


      // Finish!
      handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionHTML: html,
            descriptionMardown: text
        })
    }


    
    onChangeImage = async (event) => {
        let data = event.target.files
        let file = data[0]
        if (file) {
            let base64 = await CommonUtils.getBase64(file)
            this.setState({
                imageBase64: base64
            })
        }  
    }


    checkInput  = () => 
    {
        let checkFlag = true
        let checkArr = ['name', 'address']
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

    
    resetState = () =>
    {
        this.setState({
            name: '',
            imageBase64: '',
            descriptionHTML: '',
            descriptionMardown: '',
            address: ''
        })
    }


    handleSaveClinic = async () => 
    {
        let checkFlag = this.checkInput()
        let actions = this.state.actions

        if (checkFlag === false) return;

        if (actions === CRUD_ACTIONS.CREATE)
        {

            let res = await createNewClinic(this.state)
            if (res && res.infor.errCode === 0){
                toast.success("Tạo mới cơ sở y tế thành công ! ")
                this.setState({
                    name: '',
                    imageBase64: '',
                    address: '',
                    descriptionHTML: '',
                    descriptionMardown: ''
                })
                window.location.href = `/system/manage-clinic`;
            } 
            else
            {
                toast.error("Tạo mới cơ sở y tế thất bại ! ")
            }
        }

        if (actions === CRUD_ACTIONS.EDIT)
        {
            let reponse = await editClinicService({
                name: this.state.name,
                address: this.state.address,
                imageBase64: this.state.imageBase64,
                descriptionHTML: this.state.descriptionHTML,
                descriptionMardown: this.state.descriptionMardown,
                id:this.state.editId
            })

            if (reponse && reponse.infor.errCode === 0){
                toast.success("Cập nhật sơ sở y tế thành công ! ")
                this.resetState()
            }
            else
            {
                toast.error("Cập nhật sơ sở y tế thất bại ! ")
            }  
        }
    }

    handleEditClinic = (data) => 
    {
        this.setState(
        {
            imageBase64: '',
            editId: data.id,
            name: data.name,
            address: data.address,
            descriptionHTML: data.descriptionHTML,
            descriptionMardown: data.descriptionMardown,
            imgURL: data.image,
            actions: CRUD_ACTIONS.EDIT,
        })
    }
    render() {
        let {listClinic} = this.state
        return (
            <div className='manage-specialty-container'>
                <div className='ms-title' style={{fontWeight: '600', marginBottom: '20px', textTransform: 'uppercase', fontSize: '26px', marginTop: '20px'}}><FormattedMessage id="manage-schedule.manage-clinic"/></div>
                <div className='add-all-specialty row'>
                    <div className='col-6 form-group'>
                        <label><FormattedMessage id="manage-schedule.name-clinic"/></label>
                        <input type='text' className='form-control' 
                            value={this.state.name}
                            onChange={(event) => this.handleOnChangeInput(event,'name')}
                            />
                    </div>
                    <div className='col-6 form-group'>
                        <label><FormattedMessage id="manage-schedule.image-clinic"/></label>
                        <div className='img-container'>
                            <input id='imgAdmin' type='file' hidden onChange={(event) => this.onChangeImage(event)}></input>
                            <label className='upload_custom' htmlFor='imgAdmin'><FormattedMessage id="manage-schedule.upload"/> <i className="fas fa-upload"></i></label>
                                <div className='image-admin'
                                style = {{backgroundImage: `url(${this.state.imgURL})`}}
                                onClick = {() => this.openImage()}
                            >
                                        
                            </div>
                        </div>
                    </div>
                    <div className='col-6 form-group'>
                        <label><FormattedMessage id="manage-schedule.address-clinic"/></label>
                        <input 
                        type='text' className='form-control'
                        value={this.state.address}
                        onChange={(event) => this.handleOnChangeInput(event,'address')}/>
                    </div>
                    <div className='col-12'>
                        <MdEditor 
                        style={{ height: '320px' }} 
                        renderHTML={text => mdParser.render(text)} 
                        onChange={this.handleEditorChange} 
                        value = {this.state.descriptionMardown}
                        />
                    </div>
                    <div className='col-12 my-3'>
                        <button className={this.state.actions === CRUD_ACTIONS.EDIT ? 'btn btn-warning' : 'btn btn-primary'}  
                            onClick={() => this.handleSaveClinic()}
                        >
                        {this.state.actions === CRUD_ACTIONS.EDIT ? 
                            <FormattedMessage id ="manage-user.edit-guidebook"/> :
                            <FormattedMessage id ="manage-user.save-guidebook"/>
                            }
                        </button>
                    </div>

                    <div className='col-12 mb-5'>
                            <TableClinic 
                                handleEditClinicKey = {this.handleEditClinic}
                                clinics = {listClinic}
                            />
                    </div>

                    {this.state.isOpen === true && 
                    <Lightbox
                        mainSrc={this.state.imgURL}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                    }
                </div> 
           
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);



