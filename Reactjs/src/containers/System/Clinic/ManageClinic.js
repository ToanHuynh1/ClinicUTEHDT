import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import _ from 'lodash'
import { toast } from 'react-toastify';
import './ManageClinic.scss'
import MdEditor from 'react-markdown-editor-lite';
import MarkdownIt from 'markdown-it';
import {CommonUtils, CRUD_ACTIONS} from '../../../utils'
import {createNewClinic, getAllClinic} from '../../../services/userService'
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
            listClinic: []
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


    handleSaveClinic = async () => 
    {
        let res = await createNewClinic(this.state)
        console.log(res)
        if (res && res.infor.errCode === 0){
            toast.success("Create new clinic succeed ! ")
            this.setState({
                name: '',
                imageBase64: '',
                address: '',
                descriptionHTML: '',
                descriptionMardown: ''
            })
        } 
        else
        {
            toast.error("Create new clinic fail ! ")
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
                <div className='ms-title'>Quản lý phòng khám</div>
                <div className='add-all-specialty row'>
                    <div className='col-6 form-group'>
                        <label>Tên phòng khám</label>
                        <input type='text' className='form-control' 
                            value={this.state.name}
                            onChange={(event) => this.handleOnChangeInput(event,'name')}
                            />
                    </div>
                    <div className='col-6 form-group'>
                        <label>Ảnh phòng khám</label>
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
                    <div className='col-6 form-group'>
                        <label>Địa chỉ phòng khám</label>
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
                        <button className={this.state.actions == CRUD_ACTIONS.EDIT ? 'btn btn-warning' : 'btn btn-primary'}  
                            onClick={() => this.handleSaveGuideBook()}
                        >
                        {this.state.actions == CRUD_ACTIONS.EDIT ? 
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



