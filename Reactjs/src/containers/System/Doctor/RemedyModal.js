import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './RemedyModal.scss'
import * as actions from '../../../store/actions/index'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import MarkdownIt from 'markdown-it';
import 'react-markdown-editor-lite/lib/index.css';
import { CommonUtils } from '../../../utils';


const mdParser = new MarkdownIt(/* Markdown-it options */);

class RemedyModal extends Component {

    constructor(props)
    {
        super(props)
        this.state = {
            email: '',
            imageBase64: ''
        }
    }

    
    componentDidMount(){
        this.setState({
            email: this.props.dataModal.email
        })
    }
    componentDidUpdate( prevProps,prevState,snapshot)
    {
       if (prevProps.dataModal !== this.props.dataModal)
       {
            this.setState({
                email: this.props.dataModal.email
            })
       }
    }

    handleOnChangeEmail = (event) => {
        this.setState({
            email: event.target.value
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

    handleSendRemedy = () => {
        this.props.sendRemedy(this.state)
    }

    render() {
        let {isOpenRemedy, dataModal, closeRemedy, sendRemedy} = this.props


        return (
           <Modal
            isOpen = {isOpenRemedy}
            className={'booking-modal-container'}
            size="md"
            centered

           >
                <div className="modal-header">
                    <h5 className="modal-title">Gửi lịch trình, hóa đơn khám bệnh</h5>
                    <button type="button" className="close" aria-label="Close" onClick={closeRemedy}>
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <ModalBody>
                    <div className='row'>
                        <div className='col-6 form-group'>
                                <label>Email bệnh nhân</label>
                                <input className='form-control' type='email' value={this.state.email}
                                    onChange={(event) => {this.handleOnChangeEmail(event)}}
                                ></input>
                        </div>
                        <div className='col-6 form-group'>
                                <label>Chọn file đơn thuốc</label>
                                <input className='form-control-file' type='file' onChange={(event) => this.onChangeImage(event)}></input>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => this.handleSendRemedy()}>Send</Button>{' '}
                    <Button color="secondary" onClick={closeRemedy}>Cancel</Button>
                </ModalFooter>
           </Modal>
          
        );
    }

}

const mapStateToProps = state => {
    return {
        // lấy biến trong adminReduces
        language: state.app.language,
        genders: state.admin.genders
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
