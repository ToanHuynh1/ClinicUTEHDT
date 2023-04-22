import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils/emitter';

class ModalUser extends Component {
    constructor(props)
    {
        // properties: kế thừa các thuộc tính của lớp cha
        super(props)
        this.state = {
            id: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: ''
        }

        this.listenToEmitter()
    }

    listenToEmitter(){
        // hứng event
        emitter.on('EVENT_CLEAR_MODAL_DATA', () =>{
          this.setState({
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: ''
          })
        })
    }
    componentDidMount() {
        
    }


    // toggle khi click ra ngoài
    toggle = () =>
    {
       this.props.toggleFromParent()
    }

    // this.state.email === this.state['email']
    handleOnChangeInput = (event, id) =>
    {
        let copyState = {...this.state}
        copyState[id] = event.target.value
        this.setState({
            ...copyState
        })
    }

    checkValidateInput= () =>
    {
        let isValue= true
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address']
        for(let i = 0 ; i < arrInput.length; i++)
        {
            if(!this.state[arrInput[i]])
            {
                isValue = false
                alert('Thiếu giá trị cho: '+ arrInput[i])
                break
            }
        }

        return isValue
    }
    handleAddNewUser = () =>
    {
        // validate: check dữ liệu đúng hay sai
        let isValid =  this.checkValidateInput()
        if(isValid === true)
        {
            this.props.createNewUser(this.state)
        }
    }

    render() {
        return (
            <Modal 
            // centered kéo ra giữa màn hình
                // centered
                isOpen={this.props.isOpen} 
                toggle={() => {this.toggle()}} 
                className={'modal-user-container'}
                size='lg'
                >
            <ModalHeader 
                toggle={() => {this.toggle()}}>
                Create a new User
            </ModalHeader>
            <ModalBody>
                <div className='modal-user-body'>
                    <div className='input-container'>
                        <label>Email</label>
                        <input 
                            type='text' 
                            onChange={(event) => {this.handleOnChangeInput(event, "email")}}
                            value = {this.state.email}
                        ></input>
                    </div>
                    <div className='input-container' >
                        <label>Password</label>
                        <input 
                        type='password'
                        onChange={(event) => {this.handleOnChangeInput(event, "password")}}
                        value = {this.state.password}
                        ></input>
                    </div>
                    <div className='input-container' >
                        <label>First Name</label>
                        <input 
                        type='text' 
                        onChange={(event) => {this.handleOnChangeInput(event, "firstName")}}
                        value = {this.state.firstName}
                        ></input>
                    </div>
                    <div className='input-container' >
                        <label>Last Name</label>
                        <input 
                            type='text' 
                            onChange={(event) => {this.handleOnChangeInput(event, "lastName")}}
                            value = {this.state.lastName}
                        ></input>
                    </div>
                    <div className='input-container max-width-input' >
                        <label>Address</label>
                        <input 
                            type='text' 
                            onChange={(event) => {this.handleOnChangeInput(event, "address")}}
                            value = {this.state.address}
                        ></input>
                    </div>
                </div>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" className='px-3' onClick={() => {this.handleAddNewUser()}}>
                    Thêm
                </Button>{' '}
                <Button color="secondary" className='px-3' onClick={() => {this.toggle()}}>
                    Đóng
                </Button>
            </ModalFooter>
            </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);



