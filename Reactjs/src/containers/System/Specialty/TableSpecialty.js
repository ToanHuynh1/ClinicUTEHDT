import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableSpecialty.scss'
import * as actions from '../../../store/actions/index'

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';

const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
//   console.log('handleEditorChange', html, text);
}

class TableSpecialty extends Component {

    constructor(props)
    {
        super(props)
        this.state = {
          specialties: [],
          currentPage: 1,
          patientsPerPage: 5,
          allSpecialtyList: [],
          searchText: '',
          sortByName: true,
          searchedSpecialties: []
        }
    }

    componentDidMount(){
       this.setState({
            allSpecialtyList: this.props.specialties
       })
    }
    componentDidUpdate( prevProps,prevState,snapshot)
    {
        if(prevProps.specialties !== this.props.specialties)
        {
            this.setState({
                allSpecialtyList: this.props.specialties
            })
        }
    }

    handleDeleteGuidebook = (user) =>
    {
        // this.props.deleteUser(user.id)
    }

    handleEditSpecialty = (specialty) =>
    {
        this.props.handleEditSpecialtyKey(specialty)
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
    
        const { currentPage, specialties, patientsPerPage } = this.state;
        const totalPatients = specialties.length;
        const maxPage = Math.ceil(totalPatients / patientsPerPage);
        if (currentPage < maxPage) {
            this.setState({ currentPage: currentPage + 1 });
        }
    }

    handleDeleteSpecialty = async (data) => {

        // console.log(data)
        // let response = await deleteGuidebookService(data.id)

        // console.log(response)
    }

    handleChangeSearch = (event) => {
        const searchText = event.target.value.toLowerCase();
        const searchedSpecialties = this.state.allSpecialtyList.filter((clinic) =>
            clinic.name.toLowerCase().includes(searchText)
        );
    
        this.setState({
            searchText: searchText,
            searchedSpecialties: searchedSpecialties
        });
    }

    
    handleChangeSort = () => {
        const sortByName = !this.state.sortByName;
        const { allSpecialtyList, searchedSpecialties } = this.state;
        let specialtiesToSort = searchedSpecialties.length > 0 ? searchedSpecialties : allSpecialtyList;
    
        specialtiesToSort.sort((a, b) => {
            if (sortByName) {
                return a.name.localeCompare(b.name);
            } else {
                return b.name.localeCompare(a.name);
            }
        });
    
        this.setState({
            sortByName: sortByName,
            searchedSpecialties: searchedSpecialties.length > 0 ? specialtiesToSort : [],
            allSpecialtyList: searchedSpecialties.length === 0 ? specialtiesToSort : allSpecialtyList,
            currentPage: 1
        });
    }

    render() {

        let {allSpecialtyList, currentPage, patientsPerPage, searchText, searchedSpecialties} = this.state;
        
        if (searchedSpecialties.length > 0) {
            allSpecialtyList = searchedSpecialties;
        }

        const indexOfLastPatient = currentPage * patientsPerPage;
        const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
        const currentSpecialties = allSpecialtyList.slice(indexOfFirstPatient, indexOfLastPatient);
    
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(allSpecialtyList.length / patientsPerPage); i++) {
            pageNumbers.push(i);
        }

    
        return (
            <React.Fragment>
                <div className='search-table-specialty'>
                    <div className='btn-sort'>
                        <button onClick={this.handleChangeSort}>
                            {this.state.sortByName ? 'Sắp xếp Z-A' : 'Sắp xếp A-Z'}
                        </button>
                    </div>

                    <div className='input-search'>
                         <input placeholder='Tìm kiếm theo tên' type="text" value={searchText} onChange={this.handleChangeSearch} />
                    </div>
                </div>
                <table id='TableSpecialty'>
                    <tbody>
                        <tr>
                            <th>ID</th>
                            <th>Tên</th>
                            <th>Actions</th>
                        </tr>
                        {currentSpecialties && currentSpecialties.length > 0 && 
                            currentSpecialties.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                       
                                        <td>   
                                            <button className='btn-edit' onClick={() => this.handleEditSpecialty(item)}><i className="fas fa-edit"></i></button>
                                            <button className='btn-delete' onClick={() => this.handleDeleteSpecialty(item)}><i className="fas fa-trash-alt"></i></button>   
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

export default connect(mapStateToProps, mapDispatchToProps)(TableSpecialty);
