import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";
import {getAllGuidebook} from '../../../services/userService'
import { withRouter } from 'react-router';

class Guidebook extends Component {
    constructor(props)
    {
        super(props)
        this.state = {
            dataAllGuidebook: []
        }
    }
    async componentDidMount() {

        let data = {}
        let guidebooks = []

        data.id = 'ALL'
        let reponse = await getAllGuidebook(data)
        if (reponse && reponse.errCode ==0)
        {
            guidebooks = reponse.infor
            if (guidebooks && guidebooks.length > 0)
            {
                guidebooks.map(item =>{
                item.image = new Buffer(item.image, 'base64').toString('binary')
                return item
            })  
            }
            this.setState({
                dataAllGuidebook: guidebooks
            })
        }
    }

    handleViewDetailGuidebook = (data) => {
        console.log(data)
        this.props.history.push(`/detail-guidebook/${data.id}`)  
    }

    render() {
        let settings  = {
            dots: false,
            infinite: false,
            speed:  500,
            slidesToShow: 2,
            slidesToScroll: 2, 
            // afterChange: this.handleChangeAfter
        };

        let {dataAllGuidebook} = this.state


        return (
        <div className='section-share section-guidebook'>
            <div className='section-container'>
                <div className='section-header'>
                    <span className='title-section'>Cẩm nang</span>
                    <button className='btn-section'>Tất cả bài viết</button>
                </div>
                <div className='section-body'>
                    <Slider {...settings}>
                    {dataAllGuidebook && dataAllGuidebook.length > 0 && 
                        dataAllGuidebook.map((item,index) => {
                            return(
                                <div className='section-customize' key={index}
                                    onClick= {() => this.handleViewDetailGuidebook(item)}

                                >
                                    <div className='bg-image section-medical-guidebook'
                                        style = {{backgroundImage: `url(${item.image})`}
                                    }
                                    >
                
                                    </div>
                                    <div className='text-center' style={{fontWeight: '600' , fontSize: '15pxpx'}}>{item.name}</div>
                                </div>
                            )
                            })
                        }
                    </Slider>
                </div>
            </div>
        </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Guidebook));
