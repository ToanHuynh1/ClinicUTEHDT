import React, { Component } from 'react';
import { Fragment } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import './SeeallClinic.scss'
import _ from 'lodash'
import * as actions from '../../../store/actions'
import { LANGUAGES } from '../../../utils';
import { getAllClinic } from '../../../services/userService'
import { withRouter } from 'react-router';

class SeeallClinic extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataAllClinic: [],
            currentSection: '',
            filteredClinics: [],
            searchValue: ''
        }
    }

    async componentDidMount() {
        let response = await getAllClinic();

        if (response && response.infor.errCode === 0) {
            this.setState({
                dataAllClinic: response.infor.data || [],
                filteredClinics: response.infor.data || []
            })
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.currentSection !== this.state.currentSection) {
            const { dataAllClinic, currentSection } = this.state;
            if (currentSection) {
                const filteredClinics = dataAllClinic.filter(clinic => {
                    return clinic.name.toLowerCase().indexOf(currentSection.toLowerCase()) === 0;
                });
                this.setState({ filteredClinics });
            } else {
                this.setState({ filteredClinics: dataAllClinic });
            }
        }
        if (prevState.searchValue !== this.state.searchValue) {
            const { dataAllClinic, searchValue } = this.state;
            if (searchValue) {
                const filteredClinics = dataAllClinic.filter(clinic => {
                    return clinic.name.toLowerCase().includes(searchValue.toLowerCase());
                });
                this.setState({ filteredClinics });
            } else {
                this.setState({ filteredClinics: dataAllClinic });
            }
        }
    }

    SwitchHome = () => {
        this.props.history.push(`/`);
    }

    handleSectionClick = (section) => {
        this.setState({ currentSection: section });
    }

    handleSearchInputChange = (e) => {
        this.setState({ searchValue: e.target.value });
    }

    render() {
        const { filteredClinics, searchValue } = this.state;
        return (
            <div className='see-all-clinic-container'>
                <div className='up'>
                    <div className='left'>
                        <div className='icon-back' onClick={() => this.SwitchHome()}>
                            <i className="fas fa-sign-out-alt"></i>
                        </div>
                        <div className='title-see-all-clinic'>
                            Cơ sở y tế
                        </div>
                    </div>
                    <div className='search'>
                        <input placeholder='Tìm kiếm' value={searchValue} onChange={this.handleSearchInputChange} />
                    </div>
                </div>
                <div className='center'>
                    {_.range(27).map(i => (
                        <button key={i} onClick={() => this.handleSectionClick(i === 26 ? '' : String.fromCharCode(i + 65))}>
                            {i === 26 ? 'Hiển thị tất cả' : String.fromCharCode(i + 65)}
                        </button>
                    ))}
                </div>
                <div className='down'>
                    <div className='title' style={{marginBottom: '20px'}}>
                        {searchValue ? `Kết quả tìm kiếm cho "${searchValue}"` : `Kết quả tìm kiếm cho ký tự ${this.state.currentSection}`}
                    </div>

                    <div className='section-content-clinic'>
                    {filteredClinics.map(clinic => (
                        <div className='clinic-item' key={clinic.id}>
                            <Link to={`/detail-clinic/${clinic.id}`}>
                    
                                <div className='logo-clinic'>
                                    <img src={clinic.image ? clinic.image : ""} alt="clinic" />
                                </div>
                                <div className='clinic-info'>
                                    <div className='name'>{clinic.name}</div>
                                </div>
                            </Link>
                        </div>
                    ))}
                    </div>
                  
                </div>
            </div>
        );
    }
}    

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
        genderData: state.admin.genders,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchGenderStart : () => dispatch(actions.getGenderStart()),
    };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SeeallClinic));
