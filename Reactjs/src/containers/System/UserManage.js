import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss'
import {getAllUsers, createNewUserService, deleteUserService, editUserService} from '../../services/userService'
import ModalUser from './ModalUser';
import { emitter } from '../../utils/emitter';
import ModalEditUser from './ModalEditUser';
class UserManage extends Component {

    constructor(props)
    {
        super(props)
        this.state = {
            arrUsers: [],
            isOpenModalUser: false,
            isOpenModalEditUser: false,
            userEdit: {}
        }
    }

    async componentDidMount() {
        await this.getAllUsersFromReact()
    }

    getAllUsersFromReact = async() =>
    {
        let respone = await getAllUsers('ALL')
        if (respone && respone.errCode === 0)
        {
            this.setState({
                arrUsers: respone.users
                // mỗi lần sử dụng func setState thì component tự động render lại
                // hàm setState là hàm bất đồng bộ
                // callback: khi hàm ở trên chạy xong thì sẽ chạy vào callback
            })
        }
    }
    handleAddNewUser = () =>
    {
       this.setState({
            isOpenModalUser: true,
       })
    }

    toggleUserModal = () =>{
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser,
       })
    }

    toggleUserEditModal = () =>
    {
        this.setState({
            isOpenModalEditUser: !this.state.isOpenModalEditUser
        })
    }

    createNewUser = async (data) =>
    {
        try {
            let reponse = await createNewUserService(data)
            if(reponse && reponse.errCode !==0)
            {
                alert(reponse.errMessage)
            }
            else
            {
                await this.getAllUsersFromReact()
                this.setState({
                    isOpenModalUser: false
                })

                emitter.emit('EVENT_CLEAR_MODAL_DATA')
            }
        } catch (error) {
            console.log(error)
        }
        
    }

    handleDeleteUser =async (user) =>
    {
        try {
            let response = await deleteUserService(user.id)
            
            if (response && response.errCode == 0)
            {
                await this.getAllUsersFromReact()
            }
            else
            {
                alert(response.errMessage)
            }
        } catch (error) {
            console.log(error)
        }
    }

    handleEditUser = async (user) =>
    {
        this.setState({
            isOpenModalEditUser: true,
            userEdit:user
        })
    }

    ExcuteEditUser = async (userById) =>
    {
        try {
            let respone = await editUserService(userById)
            if (respone && respone.errCode == 0)
            {
                this.setState({
                    isOpenModalEditUser: false
                })
                await this.getAllUsersFromReact()
            }
            else
            {
                alert(respone.errMessage)
            }
           
        } catch (error) {
            console.log(error)
        }
    }
    //Chú ý: Khi vào giao diện ModalEditUser đã tự động thêm vào cây HTML
    render() {
        let arrUsers = this.state.arrUsers
        return (
            <div className="users-container">
                <ModalUser 
                    isOpen = {this.state.isOpenModalUser}
                    toggleFromParent = {this.toggleUserModal}
                    createNewUser = {this.createNewUser}
                />
                {
                    this.state.isOpenModalEditUser &&
                    <ModalEditUser
                        isOpen = {this.state.isOpenModalEditUser}
                        toggleFromParent = {this.toggleUserEditModal}
                        currentUser = {this.state.userEdit}
                        editUser = {this.ExcuteEditUser}
                    />
                }
                <div className='title text-center'>MANAGE USERS</div>
                <div className='mx-1'>
                    {/* px-3: padding right and left: 3rem, x tương đương với trục 0x */}
                    <button className='btn btn-primary px-3'
                    onClick={() => this.handleAddNewUser()}
                    ><i className="fas fa-plus mx-1"></i>Add new Users</button>
                </div>
                <div className='users-table mt-3 mx-2'>
                    <table id="customers">
                    <tbody>
                    <tr>
                        <th>Email</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Address</th>
                        <th>Actions</th>
                    </tr>

                    {/* 
                         Sử dụng map trong js
                     */}
                        {   
                            arrUsers && arrUsers.map((user, index) => {
                                return(
                                <tr key={index}>
                                    <td>{user.email}</td>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.address}</td>
                                    <td>
                                        <button className='btn-edit' onClick={()=> this.handleEditUser(user)} ><i className="fas fa-edit"></i></button>
                                        <button className='btn-delete' onClick={() => this.handleDeleteUser(user)}><i className="fas fa-trash-alt"></i></button>
                                    </td>
                                </tr>
                                )
                            })
                        }

                        </tbody>
                    </table>

                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
