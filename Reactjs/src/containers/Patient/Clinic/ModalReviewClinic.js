import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import _ from 'lodash'
import StarRating from '../Doctor/DoctorAll/StarRating';
import { postReviewClinic } from '../../../services/userService';
import { toast } from 'react-toastify';

class ModalReviewClinic extends Component {
    constructor(props)
    {
        // properties: kế thừa các thuộc tính của lớp cha
        super(props)
        this.state = {
            rating: 0,
            patientId: ''
        }
    }

    componentDidMount() {

        let {userInfo} = this.props

        if (userInfo) {
            this.setState({
                patientId: userInfo.id
            })
        }
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
    handleReviewClinic= async () =>
    {
        // validate: check dữ liệu đúng hay sai

        const reponse  = await postReviewClinic({
            patientId: this.state.patientId,
            clinicId: this.props.idClinic,
            rating: this.state.rating
        })

        console.log(reponse)
        
        if(reponse.infor.errCode === 1){
            toast.error('Bạn chưa đăng nhập hoặc chưa đánh giá')
            this.props.toggleFromParent()
        }

        if (reponse.infor.errCode === 0)
        {
            toast.success('Đánh giá thành công')
            this.props.toggleFromParent()
        }

        this.setState({
            rating: 0
        })
    }

        
    handleRatingChange = (rating) => {
        this.setState({ rating });
    };

    render() {

        let {rating} =  this.state
        return (
            <Modal 
            // centered kéo ra giữa màn hình
                // centered
                isOpen={this.props.isOpen} 
                toggle={() => {this.toggle()}} 
                size='lg'
                centered 
                >
            <ModalHeader 
                toggle={() => {this.toggle()}}>
                Đánh giá cơ sở y tế
            </ModalHeader>
            <ModalBody>
                <div className='modal-specialty-body'>
                    <StarRating
                        rating={rating}
                        onRatingChange={this.handleRatingChange}
                    />
                </div>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" className='px-3' onClick={() => {this.handleReviewClinic()}}>
                    Lưu
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
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalReviewClinic);



