import React, { Component } from 'react';
import { Fragment } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import './SeeallDoctor.scss'
import _ from 'lodash'
import * as actions from '../../../../store/actions'
import { LANGUAGES } from '../../../../utils';
import {getAllDoctorService} from '../../../../services/userService'


class SeeallDoctor extends Component {

    constructor(props)
    {
        super(props)
        this.state = {
            doctorArr: [],
            searchTerm: ''
        }
    }

    async componentDidMount() {
        this.props.loadSuperDoctors()
    }



    componentDidUpdate(prevProps,prevState,snapshot){
        if (prevProps.topDoctor !== this.props.topDoctor)
        {
            this.setState({
                doctorArr: this.props.topDoctor
            }   
            )
        }
    }


    SwitchDetailDoctor = (id) => {
        this.props.history.push(`/detail-doctor/${id}`)  
    }

    SwitchHome = () => {
        this.props.history.push(`/home`)  
    }

    handleSearchInputChange = event => {
        this.setState({ searchTerm: event.target.value });
    }
    render() {

        let {doctorArr, searchTerm} = this.state
        
        let filteredDoctors = doctorArr.filter(doctor => {
            const name = `${doctor.firstName} ${doctor.lastName}`;
            return name.toLowerCase().includes(searchTerm.toLowerCase());
        });

        return (
            <div className='see-all-doctor-container'>  
               <div className='up'>
                    <div className='icon-back' onClick={() => this.SwitchHome()}>
                        <i className="fas fa-sign-out-alt"></i>
                    </div>
                    <div className='see-all-doctor'>
                        Bác sĩ
                    </div>
               </div>

               <div className='center'>
                    <input 
                        placeholder='Tìm bác sĩ'
                        value={this.state.searchTerm}
                        onChange={this.handleSearchInputChange}
                    >
                    </input>
               </div>

               <div style={{marginTop: '20px'}}>

                <div className='prominent'>Bác sĩ nổi bật</div>
       

               {filteredDoctors && filteredDoctors.length > 0 ? (
                filteredDoctors.map((item, index) => {
                    let imageBase64 = ''
                    if (item.image)
                    {
                        imageBase64 = new Buffer(item.image, 'base64').toString('binary')
                    }

                    let name = `${item.firstName} ${item.lastName}`
                    return (
                        <div className="down" key={index}>
                            <div className="section-doctor" onClick={() => this.SwitchDetailDoctor(item.id)}>
                                <div className="img-doctor" style={{ backgroundImage: `url(${imageBase64})` }}></div>
                                <div className="name-doctor">{name}</div>
                            </div>
                        </div>
                    )
                })
                  ) : (
                <div className='no-specialty'>Chưa có chuyên khoa</div>
                 )}

            </div>
                                    
            </div>
        
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        topDoctor: state.admin.topDoctor,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadSuperDoctors: () => dispatch(actions.getSuperDoc())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SeeallDoctor);
