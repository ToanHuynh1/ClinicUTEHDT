import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableGuidebook.scss'
import * as actions from '../../../store/actions/index'

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';

const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
//   console.log('handleEditorChange', html, text);
}

class TableGuidebook extends Component {

    constructor(props)
    {
        super(props)
        this.state = {
          guidebooks: [],
          currentPage: 1,
          patientsPerPage: 5,
          allGuidebookList: []
        }
    }

    componentDidMount(){
       this.setState({
             allGuidebookList: this.props.guidebooks
       })
    }
    componentDidUpdate( prevProps,prevState,snapshot)
    {
        if(prevProps.guidebooks !== this.props.guidebooks)
        {
            this.setState({
                allGuidebookList: this.props.guidebooks
            })
        }
    }

    handleDeleteGuidebook = (user) =>
    {
        // this.props.deleteUser(user.id)
    }

    handleEditGuidebook = (guidebook) =>
    {
        console.log(guidebook)
        this.props.handleEditGuideBookKey(guidebook)
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
    
        const { currentPage, guidebooks, patientsPerPage } = this.state;
        const totalPatients = guidebooks.length;
        const maxPage = Math.ceil(totalPatients / patientsPerPage);
        if (currentPage < maxPage) {
            this.setState({ currentPage: currentPage + 1 });
        }
    }

    render() {

        let {allGuidebookList, currentPage, patientsPerPage} = this.state;


        const indexOfLastPatient = currentPage * patientsPerPage;
        const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
        const currentGuidebooks = allGuidebookList.slice(indexOfFirstPatient, indexOfLastPatient);
    
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(allGuidebookList.length / patientsPerPage); i++) {
            pageNumbers.push(i);
        }

    
        return (
            <React.Fragment>
                <table id='TableGuidebook'>
                    <tbody>
                        <tr>
                            <th>Tên</th>
                            <th>Loại</th>
                            <th>Actions</th>
                        </tr>
                        {currentGuidebooks && currentGuidebooks.length > 0 && 
                            currentGuidebooks.map((guidebook, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{guidebook.name}</td>
                                        <td>{guidebook.type}</td>
                                        <td>   
                                            <button className='btn-edit' onClick={() => this.handleEditGuidebook(guidebook)}><i className="fas fa-edit"></i></button>
                                            <button className='btn-delete' onClick={() => this.handleDeleteUser(guidebook)}><i className="fas fa-trash-alt"></i></button>   
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

export default connect(mapStateToProps, mapDispatchToProps)(TableGuidebook);
