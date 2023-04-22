import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManagePatient.scss'
import { FormattedMessage } from 'react-intl';
import Select from 'react-select';
import * as actions from '../../../store/actions/index'
import { LANGUAGES, dateFormat } from '../../../utils';
import DatePicker from '../../../components/Input/DatePicker';
import { toast } from 'react-toastify';
// format ngày tháng năm
import {getPatientOfDoctor, postSendRemedy} from '../../../services/userService'
import moment from 'moment';
import _ from 'lodash'
import RemedyModal from './RemedyModal';
import { Toast } from 'reactstrap';
import LoadingOverlay from 'react-loading-overlay';


class ManagePatient extends Component {
    constructor(props){
        super(props) 
        this.state = {
            currentDate: moment(new Date()).startOf('day').valueOf(),
            dataPatient: [],
            currentPage: 1,
            patientsPerPage: 2,
            isOpenRemedy: false,
            dataModal: {},
            isShow: false
        }
    }

    async componentDidMount(){
       
       this.getDataPatient()

    }   

    componentDidUpdate(prevProps,prevState,snapshot){
       
    }

    handleOnchangeDataPicker = (dateSelect) => 
    {
        this.setState({
            currentDate: dateSelect[0]
        }, async () => {
            await this.getDataPatient()
        })
    }

    getDataPatient = async () => {

        let {user} = this.props
        let {currentDate} = this.state
        let dataFormat = new Date(currentDate).getTime()
        let res = await getPatientOfDoctor({
            doctorId: user.id,
            date: dataFormat
        })

        if (res && res.errCode == 0)
        {
            this.setState({
                dataPatient: res.data
            })
        }
    }
    
    handleConfirm = (item) => {
    
        let data = {
            doctorId: item.doctorId,
            patientId: item.patientId,
            email: item.patientData.email,
            timeType: item.timeType,
            language: this.props.language,
            patientName: item.patientData.firstName
        }

        this.setState({
            isOpenRemedy: true,
            dataModal: data
        })
    }

    handleSend = () => {

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

        const { currentPage, dataPatient, patientsPerPage } = this.state;
        const totalPatients = dataPatient.length;
        const maxPage = Math.ceil(totalPatients / patientsPerPage);
        if (currentPage < maxPage) {
            this.setState({ currentPage: currentPage + 1 });
        }
    }

    closeRemedy = () => {
        this.setState({
            dataModal: {},
            isOpenRemedy: false
        })
    }

    sendRemedy = async (data) => {

        let {dataModal} = this.state

        this.setState({
            isShow : true
        })
        let response = await postSendRemedy({
            email: data.email,
            imgBase64: data.imageBase64,
            doctorId: dataModal.doctorId,
            patientId: dataModal.patientId,
            timeType: dataModal.timeType,
            patientName: dataModal.patientName
        })

        if (response && response.infor.errCode == 0)
        {
            toast.success('Send success !!!')
            this.closeRemedy()
            await this.getDataPatient()

            this.setState({
                isShow : false
            })
            
        }
        else
        {
            toast.error('Send error !!!')
        }
    } 


    render() {
        let {language} = this.props
    
        let {dataPatient, currentPage, patientsPerPage} = this.state;
        const indexOfLastPatient = currentPage * patientsPerPage;
        const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
        const currentPatients = dataPatient.slice(indexOfFirstPatient, indexOfLastPatient);
    
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(dataPatient.length / patientsPerPage); i++) {
            pageNumbers.push(i);
        }
    

        return (
            <>
             <div className='manage-patient-container'>
                <div className='m-p-title'>
                    Quản lý bệnh nhân
                </div>
                <div className='manage-patient-body row'>
                    <div className='col-4 form-group'>
                        <label>Chọn ngày khám</label>
                        <DatePicker
                            onChange= {this.handleOnchangeDataPicker}
                            className = 'form-control'
                            value={this.state.currentDate}
                        />
                    </div>
    
                    <div className='col-12 ' >
                        <table id='table-manage-patient' style={{width: '100%'}}>
                            <tbody>
                                <tr>
                                    <th>STT</th>
                                    <th>Thời gian</th>
                                    <th>Họ và tên</th>
                                    <th>Địa chỉ</th>
                                    <th>Giới tính</th>
                                    <th>Actions</th>
                                </tr>
                                {   
                                    currentPatients && currentPatients.length ? currentPatients.map((item, index) => {
                                        let time = language === LANGUAGES.VI ? item.timeTypeDataPatient.valueVi : item.timeTypeDataPatient.valueEn
                                        let gender = language === LANGUAGES.VI ? item.patientData.genderData.valueVi : item.patientData.genderData.valueEn
                                        return(
                                            <tr key={index}>
                                                <td>{indexOfFirstPatient + index + 1}</td>
                                                <td>{time}</td>
                                                <td>{item.patientData.firstName}</td>
                                                <td>{item.patientData.address}</td>
                                                <td>{gender}</td>
                                                <td>
                                                    <button className='btn-confirm' onClick={() => this.handleConfirm(item)}>Xác nhận</button>
                                                    <button className='btn-send' onClick={()=> this.handleSend()}>Gửi hóa đơn</button>
                                                </td>
                                            </tr>
                                        )
                                    }) : <tr><td colSpan="6">Không có dữ liệu</td></tr>
                                }
                            </tbody>
                        </table>
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
                </div>
            </div>

            <RemedyModal
                isOpenRemedy = {this.state.isOpenRemedy}
                dataModal = {this.state.dataModal}
                closeRemedy = {this.closeRemedy}
                sendRemedy = {this.sendRemedy}
            />

            <LoadingOverlay
                active={this.state.isShow}
                spinner
                text='Loading your content...'
                >
                </LoadingOverlay>
            </>
           
        );
    }
    
}


const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        user: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllDoctors: () => dispatch(actions.getAllDoctors()),
        getAllScheduleTimes: () => dispatch(actions.getAllScheduleTimes()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
