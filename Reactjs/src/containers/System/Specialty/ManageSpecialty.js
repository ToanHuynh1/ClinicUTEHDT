import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import _ from 'lodash'
import { toast } from 'react-toastify';
import './ManageSpecialty.scss'
import MdEditor from 'react-markdown-editor-lite';
import MarkdownIt from 'markdown-it';
import {CommonUtils, CRUD_ACTIONS} from '../../../utils'
import {createNewSpecialty, getAllSpecialty, editSpecialtyService} from '../../../services/userService'
import TableSpecialty from './TableSpecialty';
import Lightbox from 'react-image-lightbox';
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageSpecialty extends Component {
    constructor(props)
    {
        // properties: kế thừa các thuộc tính của lớp cha
        super(props)
        this.state = {
            name: '',
            isOpen: false,
            imageBase64: '',
            descriptionHTML: '',
            descriptionMardown: '',
            listSpecialty: [],
            imgURL: [],
            actions: ''
        }
    }

    openImage = () =>
    {
        if (!this.state.imgURL) return
        this.setState({
            isOpen:true,
        })
    }

    resetState = () =>
    {
        this.setState({
            name: '',
            imageBase64: '',
            descriptionHTML: '',
            descriptionMardown: '',
        })
    }


    async componentDidMount() {
        const stateCoppy = {...this.state}
        stateCoppy['actions'] = CRUD_ACTIONS.CREATE
        this.setState({
            ...stateCoppy
        })

        let reponse = await getAllSpecialty()

        if (reponse && reponse.infor.errCode === 0)
        {
            this.setState({
                listSpecialty:  reponse.infor.data ? reponse.infor.data : []
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
            let obUrl = URL.createObjectURL(file)
            this.setState({
                imgURL: obUrl,
                imageBase64: base64
            })
        }  
    }

    checkInput  = () => 
    {
        let checkFlag = true
        let checkArr = ['name']
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

    handleSaveSpecialty = async () => 
    {

        let checkFlag = this.checkInput()

        let actions = this.state.actions

        if (checkFlag === false) return;
        
        if (actions == CRUD_ACTIONS.CREATE)
        {
            let res = await createNewSpecialty({
                name: this.state.name,
                imageBase64: this.state.imageBase64,
                descriptionHTML: this.state.descriptionHTML,
                descriptionMardown: this.state.descriptionMardown,
            })

            console.log(res)
            if (res && res.infor.errCode === 0){
                toast.success("Create new specialty succeed ! ")
                this.setState({
                    name: '',
                    imageBase64: '',
                    descriptionHTML: '',
                    descriptionMardown: ''
                })
            } 
            else
            {
                toast.error("Create new specialty fail ! ")
            }
        }

        if (actions === CRUD_ACTIONS.EDIT)
        {
            let reponse = await editSpecialtyService({
                name: this.state.name,
                imageBase64: this.state.imageBase64,
                descriptionHTML: this.state.descriptionHTML,
                descriptionMardown: this.state.descriptionMardown,
                id:this.state.editId
            })

            if (reponse && reponse.infor.errCode === 0){
                toast.success("Update specialty success ! ")
                this.resetState()
            }
            else
            {
                toast.error("Update specialty fail ! ")
            }  
        }
    }

    handleEditSpecialty = (data) => 
    {

        this.setState(
        {
            imageBase64: '',
            editId: data.id,
            name: data.name,
            descriptionHTML: data.descriptionHTML,
            descriptionMardown: data.descriptionMardown,
            imgURL: data.image,
            actions: CRUD_ACTIONS.EDIT,
        })
    }
    render() {
        let {listSpecialty} = this.state
        return (
            <div className='manage-specialty-container'>
                <div className='ms-title'>Quản lý chuyên khoa</div>
                <div className='add-all-specialty row'>
                    <div className='col-6 form-group'>
                        <label>Tên chuyên khoa</label>
                        <input type='text' className='form-control' 
                            value={this.state.name}
                            onChange={(event) => this.handleOnChangeInput(event,'name')}
                            />
                    </div>
                    <div className='col-6 form-group'>
                        <label>Ảnh chuyên khoa</label>
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
                            onClick={() => this.handleSaveSpecialty()}
                        >
                        {this.state.actions == CRUD_ACTIONS.EDIT ? 
                            <FormattedMessage id ="manage-user.edit-guidebook"/> :
                            <FormattedMessage id ="manage-user.save-guidebook"/>
                            }
                        </button>
                    </div>   


                    {this.state.isOpen === true && 
                    <Lightbox
                        mainSrc={this.state.imgURL}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                      }

                    {listSpecialty && listSpecialty.length > 0 && 
                    <div className='col-12 mb-5'>
                            <TableSpecialty 
                                handleEditSpecialtyKey = {this.handleEditSpecialty}
                                specialties = {listSpecialty}
                            />
                    </div> 

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

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);



