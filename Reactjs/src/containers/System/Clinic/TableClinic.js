import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableClinic.scss'
import * as actions from '../../../store/actions/index'

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';

const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
//   console.log('handleEditorChange', html, text);
}

class TableClinic extends Component {

    constructor(props)
    {
        super(props)
        this.state = {
            clinics: [],
            currentPage: 1,
            patientsPerPage: 5,
            allClinicList: [],
            searchText: '',
            sortByName: true,
            searchedClinics: []
        }
    }

    componentDidMount(){
       this.setState({
            allClinicList: this.props.clinics
       })
    }
    componentDidUpdate( prevProps,prevState,snapshot)
    {
        if(prevProps.clinics !== this.props.clinics)
        {
            this.setState({
                allClinicList: this.props.clinics
            })
        }
    }

    handleDeleteGuidebook = (user) =>
    {
        // this.props.deleteUser(user.id)
    }

    handleEditClinic = (clinic) =>
    {
        console.log(clinic)
        this.props.handleEditClinicKey(clinic)
    }


    handleClick = (event) => {
        this.setState({
            currentPage: Number(event.target.id)
        });
    }

    handlePrevPageClick = () => {

        const { currentPage } = this.state;
        if (currentPage > 1) {
            this.setState({
                currentPage: currentPage - 1
            });
        }
    }

    handleNextPageClick = () => {
    
        const { currentPage, clinics, patientsPerPage } = this.state;
        const totalPatients = clinics.length;
        const maxPage = Math.ceil(totalPatients / patientsPerPage);
        if (currentPage < maxPage) {
            this.setState({ currentPage: currentPage + 1 });
        }
    }

    handleChangeSearch = (event) => {
        const searchText = event.target.value.toLowerCase();
        const searchedClinics = this.state.allClinicList.filter((clinic) =>
            clinic.name.toLowerCase().includes(searchText)
        );
    
        this.setState({
            searchText: searchText,
            searchedClinics: searchedClinics
        });
    }

    
    handleChangeSort = () => {
        const sortByName = !this.state.sortByName;
        const { allClinicList, searchedClinics } = this.state;
        let clinicsToSort = searchedClinics.length > 0 ? searchedClinics : allClinicList;
    
        clinicsToSort.sort((a, b) => {
            if (sortByName) {
                return a.name.localeCompare(b.name);
            } else {
                return b.name.localeCompare(a.name);
            }
        });
    
        this.setState({
            sortByName: sortByName,
            searchedClinics: searchedClinics.length > 0 ? clinicsToSort : [],
            allClinicList: searchedClinics.length === 0 ? clinicsToSort : allClinicList,
            currentPage: 1
        });
    }
    
    

    render() {

        let { allClinicList, currentPage, patientsPerPage, searchedClinics, searchText } = this.state;

        if (searchedClinics.length > 0) {
            allClinicList = searchedClinics;
        }

        const indexOfLastPatient = currentPage * patientsPerPage;
        const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
        const currentClinics = allClinicList.slice(indexOfFirstPatient, indexOfLastPatient);

        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(allClinicList.length / patientsPerPage); i++) {
            pageNumbers.push(i);
        }

    
        return (
            <React.Fragment>
                <div className='search-table-clinic'>
                    <div className='btn-sort'>
                        <button onClick={this.handleChangeSort}>
                            {this.state.sortByName ? 'Sắp xếp Z-A' : 'Sắp xếp A-Z'}
                        </button>
                    </div>

                    <div className='input-search'>
                        <i class="fas fa-search"></i>
                        <input placeholder='Tìm kiếm theo tên' type="text" value={searchText} onChange={this.handleChangeSearch} />
                    </div>
                </div>
                <table id='TableClinic'>
                    <tbody>
                        <tr>
                            <th>Tên</th>
                            <th>Địa chỉ</th>
                            <th>Actions</th>
                        </tr>
                        {currentClinics && currentClinics.length > 0 && 
                            currentClinics.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.name}</td>
                                        <td>{item.address}</td>
                                        <td>   
                                            <button className='btn-edit' onClick={() => this.handleEditClinic(item)}><i className="fas fa-edit"></i></button>
                                            <button className='btn-delete' onClick={() => this.handleDeleteUser(item)}><i className="fas fa-trash-alt"></i></button>   
                                        </td>
                                    </tr> 
                                )
                            })
                        }

                    </tbody>
                </table>

                <div className='modify-page'>
                    <ul className="pagination">
                        <li className={currentPage === 1 ? 'disabled' : ''}>
                            <button onClick={this.handlePrevPageClick} className='btn_prevPage'>«</button>
                        </li>
                        {pageNumbers.map((number) => (
                            <li key={number} className={currentPage === number ? 'active' : ''}>
                                <button id={number} onClick={this.handleClick}>
                                        {number}
                                </button>
                            </li>
                        ))}
                        <li className={currentPage === pageNumbers.length ? 'disabled' : ''}>
                            <button onClick={this.handleNextPageClick} className='btn_nextPage'>»</button>
                    </li>
                    </ul>
                </div>
            </React.Fragment>
          
        );
    }

}

const mapStateToProps = state => {
    return {
        usersList: state.admin.guidebooks
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getUser: () => dispatch(actions.getAllUserStart()),
        deleteUser: (id) => dispatch(actions.deleteUser(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableClinic);
