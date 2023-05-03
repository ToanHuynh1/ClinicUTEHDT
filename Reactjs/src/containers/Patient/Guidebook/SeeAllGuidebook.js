import React, { Component } from 'react';
import { Fragment } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import './SeeAllGuidebook.scss'
import HomeHeader from '../../HomePage/HomeHeader';
import _ from 'lodash'
import { LANGUAGES } from '../../../utils';
import {getAllGuidebook} from '../../../services/userService'
import img_specialty from '../../../assets/specialty/nhi-khoa.jpg'


class SeeAllGuidebook extends Component {

    constructor(props)
    {
        super(props)
        this.state = {
            dataGuidebook: [],
            filteredGuidebooks: [],
            searchValue: '',
            currentSection: '',
        }
    }

    handleSectionClick = (section) => {
        this.setState({ currentSection: section });
    }

    async componentDidMount() {
        let response = await getAllGuidebook({
            id: 'ALL'
        })

        if (response && response.errCode === 0) {
            let dataGuidebook = response.infor
            if (dataGuidebook && dataGuidebook.length > 0)
            {
                dataGuidebook.map(item =>{
                item.image = new Buffer(item.image, 'base64').toString('binary')
                return item
            })  
            }
            this.setState({
                dataGuidebook: dataGuidebook || [],
                filteredGuidebooks: dataGuidebook || []
            })
        }

    }



    componentDidUpdate(prevProps,prevState,snapshot){
        if (prevState.currentSection !== this.state.currentSection) {
            const { dataGuidebook, currentSection } = this.state;
            if (currentSection) {
                const filteredGuidebooks = dataGuidebook.filter(guidebook => {
                    return guidebook.name.toLowerCase().indexOf(currentSection.toLowerCase()) === 0;
                });
                this.setState({ filteredGuidebooks });
            } else {
                this.setState({ filteredGuidebooks: dataGuidebook });
            }
        }
        if (prevState.searchValue !== this.state.searchValue) {
            const { dataGuidebook, searchValue } = this.state;
            if (searchValue) {
                const filteredGuidebooks = dataGuidebook.filter(guidebook => {
                    return guidebook.name.toLowerCase().includes(searchValue.toLowerCase());
                });
                this.setState({ filteredGuidebooks });
            } else {
                
                this.setState({ filteredGuidebooks: dataGuidebook });
            }
        }
    }


    SwitchDetailSpecialty = (id) => {
        this.props.history.push(`/detail-specialty/${id}`)  
    }

    SwitchHome = () => {
        this.props.history.push(`/home`)  
    }

    handleSearchInputChange = (e) => {
        this.setState({ searchValue: e.target.value });
    }

    render() {
        let {filteredGuidebooks, searchValue} = this.state
        return (
            <div className='see-all-guidebook-container'>  
                 <div className='up'>
                    <div className='left'>
                        <div className='icon-back' onClick={() => this.SwitchHome()}>
                            <i className="fas fa-sign-out-alt"></i>
                        </div>
                        <div className='title-see-all-guidebook'>
                            Cẩm nang
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
                        {searchValue ? `Kết quả tìm kiếm "${searchValue}"` : `Kết quả tìm kiếm ${this.state.currentSection}`}
                    </div>

                    <div className='section-content-guidebook'>
                    {filteredGuidebooks.map(guidebook => (
                        <div className='guidebook-item' key={guidebook.id}>
                            <Link to={`/detail-guidebook/${guidebook.id}`}>
                    
                                <div className='logo-guidebook'>
                                    <img src={guidebook.image ? guidebook.image : ""} alt="guidebook" />
                                </div>
                                <div className='guidebook-info'>
                                    <div className='name'>{guidebook.name}</div>
                                </div>
                            </Link>
                        </div>
                    ))}
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

export default connect(mapStateToProps, mapDispatchToProps)(SeeAllGuidebook);
