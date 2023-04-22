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

    constructor(props)
    {
        super(props)
        this.state = {
          users: [],
          currentPage: 1,
          patientsPerPage: 5,
        }
    }

    componentDidMount(){
        this.props.getUser()
    }
    componentDidUpdate( prevProps,prevState,snapshot)
    {
        if(prevProps.usersList !== this.props.usersList)
        {
            this.setState({
                users: this.props.usersList
            })
        }
    }

    handleDeleteUser = (user) =>
    {
        this.props.deleteUser(user.id)
    }

    handleEditUser = (user) =>
    {
        this.props.handleEditUserKey(user)
    }


    handleClick = (event) => {
        this.setState({
            currentPage: Number(event.target.id)
        });
    }

    handlePrevPageClick = () => {
        // const { currentPage } = this.state;
        // this.setState({
        //     currentPage: currentPage - 1
        // });

        const { currentPage } = this.state;
        if (currentPage > 1) {
            this.setState({
                currentPage: currentPage - 1
            });
        }
    }

    handleNextPageClick = () => {
        // const { currentPage } = this.state;
        // this.setState({
        //     currentPage: currentPage + 1
        // });

        const { currentPage, users, patientsPerPage } = this.state;
        const totalPatients = users.length;
        const maxPage = Math.ceil(totalPatients / patientsPerPage);
        if (currentPage < maxPage) {
            this.setState({ currentPage: currentPage + 1 });
        }
    }

    render() {

        let {users, currentPage, patientsPerPage} = this.state;
        const indexOfLastPatient = currentPage * patientsPerPage;
        const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
        const currentPatients = users.slice(indexOfFirstPatient, indexOfLastPatient);
    
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(users.length / patientsPerPage); i++) {
            pageNumbers.push(i);
        }

    
        return (
            <React.Fragment>
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
