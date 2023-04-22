import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import _ from 'lodash'
import { toast } from 'react-toastify';
import './ManageSpecialty.scss'
import MdEditor from 'react-markdown-editor-lite';
import MarkdownIt from 'markdown-it';
import {CommonUtils} from '../../../utils'
import {createNewSpecialty} from '../../../services/userService'
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageSpecialty extends Component {
    constructor(props)
    {
        // properties: kế thừa các thuộc tính của lớp cha
        super(props)
        this.state = {
            name: '',
            imageBase64: '',
            descriptionHTML: '',
            descriptionMardown: ''
        }
    }

    componentDidMount() {
     
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


    handleSaveSpecialty = async () => 
    {
        let res = await createNewSpecialty(this.state)
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
    render() {
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
                        <input type='file' className='form-control-file'
                        
                            onChange={(event) => this.onChangeImage(event)}
                        />
                    </div>
                    <div className='col-12'>
                        <MdEditor 
                        style={{ height: '320px' }} 
                        renderHTML={text => mdParser.render(text)} 
                        onChange={this.handleEditorChange} 
                        value = {this.state.descriptionMardown}
                        />
                    </div>
                    <div className='col-12'>
                        <button className='btn-save-specialty'
                            onClick={() => this.handleSaveSpecialty()}
                        >
                            Lưu
                        </button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);



