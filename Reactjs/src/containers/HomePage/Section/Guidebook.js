import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";


class Guidebook extends Component {
   
    render() {
        return (
        <div className='section-share section-guidebook'>
            <div className='section-container'>
                <div className='section-header'>
                    <span className='title-section'>Cẩm nang</span>
                    <button className='btn-section'>Tất cả bài viết</button>
                </div>
                <div className='section-body'>
                    <Slider {...this.props.settings}>
                        <div className='section-customize'>
                            <div className='bg-image section-guidebook'>

                            </div>
                            <div className='text-center'>Cơ xương khớp 1</div>
                        </div>
                        <div className='section-customize'>
                            <div className='bg-image section-guidebook'>
                                
                            </div>
                            <div className='text-center'>Cơ xương khớp 2</div>
                        </div>
                        <div className='section-customize'>
                            <div className='bg-image section-guidebook'>

                            </div>
                            <div className='text-center'>Cơ xương khớp 3</div>
                        </div>
                        <div className='section-customize'>
                           <div className='bg-image section-guidebook'>
                                
                            </div>
                            <div className='text-center'>Cơ xương khớp 4</div>
                        </div>
                        <div className='section-customize'>
                            <div className='bg-image section-guidebook'>
                                
                            </div>
                            <div className='text-center'>Cơ xương khớp 5</div>
                        </div>
                        <div className='section-customize'>
                            <div className='bg-image section-guidebook'>
                                
                            </div>
                            <div className='text-center'>Cơ xương khớp 6</div>
                        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Guidebook);
