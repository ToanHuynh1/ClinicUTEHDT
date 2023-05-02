import React, { Component } from 'react';
import { Fragment } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import './DetailDoctor.scss'
import {getDetailInfoDoctor, sendReviewDoctor, getAllReviewForDoctor} from '../../../services/userService'
import { LANGUAGES } from '../../../utils';
import DoctorSchedule from './DoctorSchedule';
import DoctorMoreInfor from './DoctorMoreInfor';
import { toast } from 'react-toastify';
import HomeFooter from '../../HomePage/HomeFooter'
import LikeShare from '../../System/SocialPlugin/LikeShare'
import Comment from '../../System/SocialPlugin/Comment'
class DetailDoctor extends Component {

    constructor(props)
    {
        super(props)
        this.state = {
            detailDoctor: {},
            currentDoctor: -1,
            contentReview: '',
            allReview: {}
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id)
        {
            let id = this.props.match.params.id

            this.setState({
                currentDoctor: id
            })
            let response = await getDetailInfoDoctor(id)
            if (response && response.errCode === 0)
            {
                this.setState({
                    detailDoctor: response.data,
                })
            }
        }

        let result = await getAllReviewForDoctor({
            doctorId: this.state.currentDoctor
        })

       if (result && result.errCode === 0)
       {
        this.setState({
            allReview: result.dataReview
        })
       }
     
    }

    componentDidUpdate(prevProps,prevState,snapshot){

    }


     hanleSendReview = async () => {
        
        const today = new Date();
        const day = today.getDate().toString().padStart(2, "0"); 
        const month = (today.getMonth() + 1).toString().padStart(2, "0"); 
        const year = today.getFullYear(); 
        const hours = today.getHours().toString().padStart(2, "0"); 
        const minutes = today.getMinutes().toString().padStart(2, "0"); 
        const formattedDateTime = `${day}/${month}/${year} ${hours}:${minutes}`;
          
        if (this.props.userInfo)
        {
            let patientName = this.props.userInfo.firstName

            let reponse = await sendReviewDoctor({
                doctorId: this.state.currentDoctor,
                patientName: patientName,
                date: formattedDateTime,
                status: this.state.contentReview
            })

            if (reponse.info.errCode === 0)
            {
                toast.success('Gửi đánh giá thành công')
                this.setState({
                    contentReview:''
                })
                window.location.href = `/detail-doctor/${this.state.currentDoctor}`;
            }

            else
            {
                toast.error('Gửi đánh giá thất bại')
            }
        }

        else
        {
            alert('Mời bạn ấn đăng nhập')
        }

    }

    handleOnChangeStatus = (event) => {
        let status = event.target.value
        this.setState({
            contentReview: status
        })
    }
    render() {
        let {detailDoctor , allReview} = this.state
        let nameVi = '',nameEn=''
        let {language} = this.props

        if (detailDoctor && detailDoctor.positionData)
        {
            nameVi = `${detailDoctor.positionData.valueVi},${detailDoctor.lastName} ${detailDoctor.firstName} `
            nameEn = `${detailDoctor.positionData.valueEn},${detailDoctor.firstName} ${detailDoctor.lastName}`
        }

        return (
            <>
                <HomeHeader isShowBanner={false}/>
                <div className='doctor-detail-container'>
                    <div className='introduction-doctor'>
                        <div className='content-left' 
                            style = {{backgroundImage: `url(${detailDoctor && detailDoctor.image ? detailDoctor.image : ''})`}}    
                        >

                        </div>
                        <div className='content-right'>
                            <div className='up'>{language === LANGUAGES.VI ? nameVi : nameEn}</div>
                            <div className='down'>
                               {
                                    detailDoctor.Markdown &&  detailDoctor.Markdown.description &&
                                    <span>
                                       { detailDoctor.Markdown.description}
                                    </span>
                               }
                            </div>
                        </div>
                    </div>
                    <div className='appointment-doctor'>
                        <div className='content-left'>
                            <DoctorSchedule
                                doctorIdParent={this.state.currentDoctor}
                                detailDoctor = {detailDoctor}
                            />
                        </div>
                        <div className='content-right'>
                            <DoctorMoreInfor 
                                doctorIdParent={this.state.currentDoctor}
                            />
                        </div>
                    </div>
                    <div className='detail-info-doctor'>
                        {detailDoctor && detailDoctor.Markdown && detailDoctor.Markdown.contentHTML &&
                            <div dangerouslySetInnerHTML={{__html: detailDoctor.Markdown.contentHTML }}></div>
                        }
                    </div>
                    <div className='review-doctor'>
                        <div className='title-review-doctor'>
                            Đánh giá
                        </div>

                        {allReview && allReview.length > 0 ? (
                            allReview.map((item , index) => (
                                <div className='content-review' key={index}>
                                    <div className='customize'>
                                        <div className='title-name-time'>
                                            <div className='name-review'>
                                                {item.patientName}
                                            </div>

                                            <div className='time-review'>
                                                {item.date}
                                            </div>
                                        </div>

                                        <div className='status'>
                                            {item.status}
                                        </div>
                                    </div>                      
                                </div>
                            ))
                        ) : (
                            <div>Hãy là người đầu tiên bình luận</div>
                        )}
                     

                        <div className='input-review-patient'>
                            <div className='custom-input'>
                                <input placeholder='Nhập đánh giá của bạn...'  
                                    onChange={(event) => this.handleOnChangeStatus(event)} 
                                    value={this.state.contentReview}
                                    >
                                </input>

                                <i className="fas fa-paper-plane" onClick={() => this.hanleSendReview()}></i>
                            </div>
                        </div>
                    </div>
                    
                    <HomeFooter/>
                </div>
               
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        userInfo: state.user.userInfo,
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
