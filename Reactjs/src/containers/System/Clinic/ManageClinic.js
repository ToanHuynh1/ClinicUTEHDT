import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import _ from 'lodash'
import { toast } from 'react-toastify';
import './ManageClinic.scss'
import MdEditor from 'react-markdown-editor-lite';
import MarkdownIt from 'markdown-it';
import {CommonUtils} from '../../../utils'
import {createNewClinic} from '../../../services/userService'
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
    render() {
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
                        <input type='file' className='form-control-file'
                        
                            onChange={(event) => this.onChangeImage(event)}
                        />
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
                    <div className='col-12'>
                        <button className='btn-save-specialty'
                            onClick={() => this.handleSaveClinic()}
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);



