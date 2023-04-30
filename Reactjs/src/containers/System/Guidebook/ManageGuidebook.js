import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import _ from 'lodash'
import { toast } from 'react-toastify';
import './ManageGuidebook.scss'
import MdEditor from 'react-markdown-editor-lite';
import Lightbox from 'react-image-lightbox';
import MarkdownIt from 'markdown-it';
import {LANGUAGES, CRUD_ACTIONS, CommonUtils} from '../../../utils'
import {createNewGuidebook} from '../../../services/userService'
import TableGuidebook from './TableGuidebook';
import {getAllGuidebook, editGuidebookService} from '../../../services/userService'
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageGuidebook extends Component {
    constructor(props)
    {
        // properties: kế thừa các thuộc tính của lớp cha
        super(props)
        this.state = {
            name: '',
            imageBase64: '',
            descriptionHTML: '',
            descriptionMardown: '',
            type: '',
            isOpen: false,
            imgURL: [],
            listGuidebook: [],
            actions: '', 
            editId: ''
        }
    }

    async componentDidMount() {

        const stateCoppy = {...this.state}
        stateCoppy['actions'] = CRUD_ACTIONS.CREATE
        this.setState({
            ...stateCoppy
        })

        let data = {}

        data.id = 'ALL'
        let reponse = await getAllGuidebook(data)

        if (reponse && reponse.errCode === 0)
        {
            this.setState({
                listGuidebook:  reponse.infor ? reponse.infor : []
            })
        }
            
        
    }


    componentDidUpdate(prevProps,prevState, snapshot){
      
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

    handleGuidebook = (data) => 
    {
        let imageBase64 = ''
        if (data.image)
        {
            imageBase64 = new Buffer(data.image, 'base64').toString('binary')
        }
        this.setState(
        {
            name: data.name,
            imageBase64: imageBase64,
            descriptionHTML: data.descriptionHTML,
            descriptionMardown: data.descriptionMardown,
            type: data.type,
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

    resetState = () =>
    {
        this.setState({
            name: '',
            imageBase64: '',
            descriptionHTML: '',
            descriptionMardown: '',
            type: ''
        })
    }

    checkInput  = () => 
    {
        let checkFlag = true
        let checkArr = ['name', 'type']
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

    handleSaveGuideBook = async () => 
    {
    
        let checkFlag = this.checkInput()

        let actions = this.state.actions

        if (checkFlag === false) return;

        if (actions == CRUD_ACTIONS.CREATE)
        {
            let reponse = await createNewGuidebook({
                    name: this.state.name,
                    imageBase64: this.state.imageBase64,
                    descriptionHTML: this.state.descriptionHTML,
                    descriptionMardown: this.state.descriptionMardown,
                    type: this.state.type
            })

            if (reponse && reponse.infor.errCode === 0){
                toast.success("Create new guidebook success ! ")
                let data = {}

                data.id = 'ALL'
                await getAllGuidebook(data)
                this.resetState()
            }


            else
            {
                toast.error("Create new guidebook fail ! ")
            }  
        }    
        
        if (actions === CRUD_ACTIONS.EDIT)
        {
            let reponse = await editGuidebookService({
                name: this.state.name,
                imageBase64: this.state.imageBase64,
                descriptionHTML: this.state.descriptionHTML,
                descriptionMardown: this.state.descriptionMardown,
                type: this.state.type,
                id:this.state.editId
            })

            if (reponse && reponse.infor.errCode === 0){
                toast.success("Update guidebook success ! ")
                this.resetState()
            }


            else
            {
                toast.error("Update guidebook fail ! ")
            }  
        }
       
    }

    openImage = () =>
    {
        if (!this.state.imgURL) return
        this.setState({
            isOpen:true,
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

    handleEditGuidebook = (data) => 
    {

        let imageBase64 = ''

        if (data.image)
        {
            imageBase64 = new Buffer(data.image, 'base64').toString('binary')
        }

        this.setState(
        {
            imageBase64: '',
            editId: data.id,
            name: data.name,
            type: data.type,
            descriptionHTML: data.descriptionHTML,
            descriptionMardown: data.descriptionMardown,
            imgURL: imageBase64,
            actions: CRUD_ACTIONS.EDIT,
        })
    }
    render() {

        let {listGuidebook} = this.state


        console.log(this.state)
        return (
            <div className='manage-guidebook-container'>
                <div className='ms-title' style={{fontWeight: '600', marginBottom: '20px', textTransform: 'uppercase', fontSize: '26px', marginTop: '20px'}}>Quản lý cẩm nang</div>
                <div className='add-all-guidebook row'>
                    <div className='col-6 form-group'>
                        <label>Tên cẩm nang:</label>
                        <input type='text' className='form-control' 
                            value={this.state.name}
                            onChange={(event) => this.handleOnChangeInput(event,'name')}
                            />
                    </div>

                    <div className='col-4 form-group'>
                        <label>Loại:</label>
                        <input type='text' className='form-control' 
                            value={this.state.type}
                            onChange={(event) => this.handleOnChangeInput(event,'type')}
                            />
                    </div>


                    <div className='col-6 form-group'>
                        <label>Ảnh cẩm nang</label>
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
                            onClick={() => this.handleSaveGuideBook()}
                        >
                        {this.state.actions == CRUD_ACTIONS.EDIT ? 
                            <FormattedMessage id ="manage-user.edit-guidebook"/> :
                            <FormattedMessage id ="manage-user.save-guidebook"/>
                            }
                        </button>
                    </div>   
                </div> 
           
                {this.state.isOpen === true && 
                    <Lightbox
                        mainSrc={this.state.imgURL}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                }

                    <div className='col-12 mb-5'>
                            <TableGuidebook 
                                handleEditGuideBookKey = {this.handleEditGuidebook}
                                guidebooks = {listGuidebook}
                            />
                    </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageGuidebook);



