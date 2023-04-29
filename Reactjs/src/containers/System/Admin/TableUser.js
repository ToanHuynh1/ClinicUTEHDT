import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableUser.scss'
import * as actions from '../../../store/actions/index'

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';

const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
  console.log('handleEditorChange', html, text);
}

class TableUser extends Component {
    constructor(props) {
      super(props);
      this.state = {
        dataUsers: [],
        currentPage: 1,
        patientsPerPage: 5,
        searchTerm: '',
        originalUsers: []
      };
    }
  
    async componentDidMount() {
      await this.props.getUser();
      this.setState({
        originalUsers: this.props.usersList 
      });
    }
  
    componentDidUpdate(prevProps, prevState, snapshot) {
      if (prevProps.usersList !== this.props.usersList) {
        this.setState({
          dataUsers: this.props.usersList,
        });
      }
    }
  
    handleDeleteUser = (user) => {
      this.props.deleteUser(user.id);
    };
  
    handleEditUser = (user) => {
      this.props.handleEditUserKey(user);
    };
  
    handleClick = (event) => {
      this.setState({
        currentPage: Number(event.target.id),
      });
    };
  
    handlePrevPageClick = () => {
      const { currentPage } = this.state;
      if (currentPage > 1) {
        this.setState({
          currentPage: currentPage - 1,
        });
      }
    };
  
    handleNextPageClick = () => {
      const { currentPage, dataUsers, patientsPerPage } = this.state;
      const totalPatients = dataUsers.length;
      const maxPage = Math.ceil(totalPatients / patientsPerPage);
      if (currentPage < maxPage) {
        this.setState({ currentPage: currentPage + 1 });
      }
    };
  
    filterUsers = (event) => {
        let value = event.target.value;
        let { dataUsers, originalUsers } = this.state;
        let sortedUsers = [];
        
        switch (value) {
          case "name_asc":
            sortedUsers = dataUsers.sort((a, b) => a.firstName.localeCompare(b.firstName));
            break;
          case "name_desc":
            sortedUsers = dataUsers.sort((a, b) => b.firstName.localeCompare(a.firstName));
            break;
          case "email_asc":
            sortedUsers = dataUsers.sort((a, b) => a.email.localeCompare(b.email));
            break;
          case "email_desc":
            sortedUsers = dataUsers.sort((a, b) => b.email.localeCompare(a.email));
            break;
          default:
            // Nếu không có giá trị nào phù hợp thì lấy danh sách ban đầu
            sortedUsers = originalUsers;
            break;
        }
    
        this.setState({ dataUsers: sortedUsers });
      };
    
      handleSearchTermChange = (event) => {
        const searchTerm = event.target.value;
        const { originalUsers } = this.state;
    
        if (searchTerm) {
          const filteredUsers = originalUsers.filter(
            (user) => user.email.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
          );
    
          this.setState({
            searchTerm: searchTerm,
            dataUsers: filteredUsers
          });
        } else {
          this.setState({
            searchTerm: searchTerm,
            dataUsers: originalUsers // Khôi phục lại danh sách ban đầu
          });
        }
      };


    
    render() {
      let { dataUsers, currentPage, patientsPerPage } = this.state;
      const indexOfLastPatient = currentPage * patientsPerPage;
      const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
      const currentPatients = dataUsers.slice(indexOfFirstPatient, indexOfLastPatient);

      const pageNumbers = [];
      for (let i = 1; i <= Math.ceil(dataUsers.length / patientsPerPage); i++) {
        pageNumbers.push(i);
      }
  
      return (
        <React.Fragment>
            <div className='search-input-user'>
                <div className="col-12 my-3 d-flex align-items-center select-admin-user">
                    <select className="form-select me-3 custom-select" onChange={(e) => this.filterUsers(e)}>
                        <option value="macdinh">Mặc định</option>
                        <option value='name_asc'>Tên A-Z</option>
                        <option value='name_desc'>Tên Z-A</option>
                        <option value='email_asc'>Email A-Z</option>
                        <option value='email_desc'>Email Z-A</option>
                    </select>
                </div>

                <div className='search-input'>
                    <input 
                        placeholder='Tìm kiếm theo Email'
                        onChange={this.handleSearchTermChange}
                        value={this.state.searchTerm}
                    >

                    </input>
                </div>
            </div>
                <table id='TableUser'>
                    <tbody>
                        <tr>
                            <th>Email</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Address</th>
                            <th>Actions</th>
                        </tr>
                        {currentPatients && currentPatients.length > 0 && 
                            currentPatients.map((user, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{user.email}</td>
                                        <td>{user.firstName}</td>
                                        <td>{user.lastName}</td>
                                        <td>{user.address}</td>
                                        <td>   
                                            <button className='btn-edit' onClick={() => this.handleEditUser(user)}><i className="fas fa-edit"></i></button>
                                            <button className='btn-delete' onClick={() => this.handleDeleteUser(user)}><i className="fas fa-trash-alt"></i></button>   
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
        usersList: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getUser: () => dispatch(actions.getAllUserStart()),
        deleteUser: (id) => dispatch(actions.deleteUser(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableUser);
