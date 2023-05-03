import React, { Component } from 'react';
import { Fragment } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import './DetailGuidebook.scss'
import HomeHeader from '../../HomePage/HomeHeader';
import {getAllGuidebook, getAllGuidebookByType} from '../../../services/userService'
import _ from 'lodash'
import { LANGUAGES } from '../../../utils';
import { withRouter } from 'react-router';

class DetailGuidebook extends Component {

    constructor(props)
    {
        super(props)
        this.state = {
            dataDetailGuidebook: {},
            detailGuidebookId: '',
            detailGuidebookIdType: '',
            guidebookSame: []
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id)
        {
            let id = this.props.match.params.id

            let response = await getAllGuidebook({
                id: id,
            })

            if (response && response.errCode === 0)
            {
                let data = response.infor
                // let arrGuidebookId = []
                // if (data && !_.isEmpty(response.infor))
                // {
                //     let arr = data.doctorClinic

                //     if (arr && arr.length > 0)
                //     {
                //         arr.map(item => {
                //             arrDoctorId.push(item.doctorId)
                //         })
                //     }
                // }
            
                this.setState({
                    dataDetailGuidebook: response.infor,
                    detailGuidebookId: id,
                    detailGuidebookIdType: response.infor.type
                    // arrDoctorId: arrDoctorId,
                })
            }

            let {detailGuidebookId, detailGuidebookIdType} = this.state

            let result = await getAllGuidebookByType(
            {
                id: detailGuidebookId,
                type: detailGuidebookIdType
            })

            if (result && result.errCode === 0){
                this.setState({
                    guidebookSame: result.infor
                })
            }
        }
        
    }



    async componentDidUpdate(prevProps,prevState,snapshot){
     
    }


    SwtichGuidebook = (item) => {
        window.location.href = `/detail-guidebook/${item.id}`;
    }

    render() {

        let {language} = this.props
        let { dataDetailGuidebook, guidebookSame} = this.state

        let dataArrGuidebook = dataDetailGuidebook.image

        if (dataArrGuidebook){
            dataArrGuidebook = new Buffer(dataArrGuidebook, 'base64').toString('binary')
        }
        
        if (guidebookSame) {
            guidebookSame.map((item, index) => {
                item.image = new Buffer(item.image, 'base64').toString('binary')
                return item
            })
        }
        return (
            <div className='detail-guidebook-container'>  
                <HomeHeader isOpenMenu = {false}/>
                <br></br>

                <div className='detail-guidebook-body'> 
                
                    <div className='bg-image section-guidebook'
                            style = {{backgroundImage: `url(${dataArrGuidebook})`}}
                        >
                
                    </div>
                    <div className='description-guidebook'>
                        <div className='title-guidebook'>{dataDetailGuidebook.name}</div>
                        {dataDetailGuidebook && dataDetailGuidebook.descriptionHTML &&
                            <div dangerouslySetInnerHTML={{__html: dataDetailGuidebook.descriptionHTML }}></div>
                        }
                    </div>

                    <div className='related-article'>
                        <div className='title-related'>
                            Bài viết liên quan
                        </div>

                        {guidebookSame && guidebookSame.length > 0 ? (
                            guidebookSame.map((item, index) => (
                                <div className='content-write' key={index} onClick={() => this.SwtichGuidebook(item)}>
                                    <div className='image-content-write' style={{backgroundImage: `url(${item.image})`}}>
                                    </div>
                                    <div className='name-content-write'>{item.name}</div>
                                </div>
                            ))
                        ) : (
                            <div className='no-write'>Chưa có bài viết liên quan</div>
                        )}
                        
                    </div>

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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DetailGuidebook));
