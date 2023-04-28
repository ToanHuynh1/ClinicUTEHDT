import React, { Component } from 'react';
import { Fragment } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import './SeeallSpecialty.scss'
import HomeHeader from '../../HomePage/HomeHeader';
import _ from 'lodash'
import { LANGUAGES } from '../../../utils';
import {getAllSpecialty} from '../../../services/userService'
import img_specialty from '../../../assets/specialty/nhi-khoa.jpg'


class SeeallSpecialty extends Component {

    constructor(props)
    {
        super(props)
        this.state = {
            dataSpecialty: []
        }
    }

    async componentDidMount() {
        let data = await getAllSpecialty()
        if (data.infor.errCode === 0)
        {
            this.setState({
                dataSpecialty: data.infor.data ? data.infor.data : []
            })
        }
    }



    componentDidUpdate(prevProps,prevState,snapshot){
     
    }


    SwitchDetailSpecialty = (id) => {
        this.props.history.push(`/detail-specialty/${id}`)  
    }

    SwitchHome = () => {
        this.props.history.push(`/home`)  
    }
    render() {
        let {dataSpecialty} = this.state
        return (
            <div className='see-all-specialty-container'>  
               <div className='up'>
                    <div className='icon-back' onClick={() => this.SwitchHome()}>
                        <i className="fas fa-sign-out-alt"></i>
                    </div>

                    <div className='title-see-all-specialty'>
                        Chuyên khoa
                    </div>
               </div>

               <div style={{marginTop: '70px'}}>

       

               {dataSpecialty && dataSpecialty.length > 0 ? (
                dataSpecialty.map((item, index) => (
                <div className="down" key={index}>
                    <div className="section-specialty" onClick={() => this.SwitchDetailSpecialty(item.id)}>
                    <div className="img-specialty">
                        <img src={item.image} alt="Specialty Image" />
                    </div>
                    <div className="name-specialty">{item.name}</div>
                    </div>
                </div>
                ))
            ) : (
                <div>Chưa có chuyên khoa</div>
            )}

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

export default connect(mapStateToProps, mapDispatchToProps)(SeeallSpecialty);
