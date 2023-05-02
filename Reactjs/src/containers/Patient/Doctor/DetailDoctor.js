import React, { Component } from 'react';
import { Fragment } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import './DetailDoctor.scss'
import {getDetailInfoDoctor} from '../../../services/userService'
import { LANGUAGES } from '../../../utils';
import DoctorSchedule from './DoctorSchedule';
import DoctorMoreInfor from './DoctorMoreInfor';
import HomeFooter from '../../HomePage/HomeFooter'
import LikeShare from '../../System/SocialPlugin/LikeShare'
import Comment from '../../System/SocialPlugin/Comment'
class DetailDoctor extends Component {

    constructor(props)
    {
        super(props)
        this.state = {
            detailDoctor: {},
            currentDoctor: -1
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
    }

    componentDidUpdate(prevProps,prevState,snapshot){

    }
    render() {
        let {detailDoctor} = this.state
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

                        <div className='content-review'>

                        </div>

                        <div className='input-review-patient'>
                            <div className='custom-input'>
                                <input placeholder='Nhập đánh giá của bạn...'>
                                </input>

                                <i class="fas fa-paper-plane"></i>
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
