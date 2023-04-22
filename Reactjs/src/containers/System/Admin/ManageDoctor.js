import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './ManageDoctor.scss'
import * as actions from '../../../store/actions/index'

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { CRUD_ACTIONS, LANGUAGES } from '../../../utils';
import {getDetailInfoMarkdown, getDetailInfoDoctor} from '../../../services/userService'

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {

    constructor(props)
    {
        super(props)
        this.state = {
            markdownCotent: '',
            HTMLContent: '',
            selectedOption: '',
            description: '',
            listDoctors: [],
            checkData: false,
            listPrice: [],
            listPayment: [],
            listProvince: [],
            listClinic: [],
            listSpecialty: [],
            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            selectedClinic: '',
            selectedSpecialty: '',
            nameClinic: '',
            addressClinic: '',
            note: '',
            clinicId: '',
            specialtyId: ''
        }
    }

    
    componentDidMount(){
       this.props.getAllDoctors()
       this.props.fetchRequiredDoctorInfo()
    }
    componentDidUpdate( prevProps,prevState,snapshot)
    {
       if (prevProps.allDoctors !== this.props.allDoctors)
       {
            let dataSelected = this.builDataInputSelect(this.props.allDoctors, 'USERS')
          
            this.setState({
                listDoctors: dataSelected,
               
            })
       }

       if (prevProps.allRequired !== this.props.allRequired)
       {
            let {resPayment, resProvince, resPrice, resSpecialty, resClinic} = this.props.allRequired
            let dataSelectedPrice = this.builDataInputSelect(resPrice, 'PRICE')
            let dataSelectedPayment = this.builDataInputSelect(resPayment, 'PAYMENT')
            let dataSelectedProvince = this.builDataInputSelect(resProvince, 'PROVINCE')
            let dataSelectSpecialty = this.builDataInputSelect(resSpecialty, 'SPECIALTY')
            let dataSelectClinic = this.builDataInputSelect(resClinic, 'CLINIC')

            this.setState({
                listPrice: dataSelectedPrice,
                listPayment: dataSelectedPayment,
                listProvince: dataSelectedProvince,
                listSpecialty: dataSelectSpecialty,
                listClinic: dataSelectClinic
            })
       }

       if (prevProps.language !== this.props.language)
       {
            let dataSelected = this.builDataInputSelect(this.props.allDoctors,  'USERS')
            let {resPayment, resProvince, resPrice} = this.props.allRequired
            let dataSelectedPrice = this.builDataInputSelect(resPrice, 'PRICE')
            let dataSelectedPayment = this.builDataInputSelect(resPayment, 'PAYMENT')
            let dataSelectedProvince = this.builDataInputSelect(resProvince, 'PROVINCE')
            this.setState({
                listDoctors: dataSelected,
                listPrice: dataSelectedPrice,
                listPayment: dataSelectedPayment,
                listProvince: dataSelectedProvince
            })
       }
    }

    // Finish!
    handleEditorChange = ({ html, text }) => {
        this.setState({
            markdownCotent: text,
            HTMLContent: html,
        })
    }


    handleSaveInfoMarkdown = () => {
        let {checkData} = this.state
        
        this.props.saveDetailDoctor({
            contentHTML: this.state.HTMLContent,
            cotentMarkdown: this.state.markdownCotent,
            description: this.state.description,
            doctorId: this.state.selectedOption.value,
            // Kiểm tra hành động
            actions: checkData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,


            selectedPrice: this.state.selectedPrice.value,
            selectedPayment: this.state.selectedPayment.value,
            selectedProvince: this.state.selectedProvince.value,
            nameClinic: this.state.nameClinic,
            addressClinic: this.state.addressClinic,
            note: this.state.note,
            clinicId: this.state.selectedClinic && this.state.selectedClinic.value ? this.state.selectedClinic.value : '',
            specialtyId: this.state.selectedSpecialty && this.state.selectedSpecialty.value ? this.state.selectedSpecialty.value : ''
        })
    }

    handleChangeSelected = async (selectedOption) => {
        this.setState({ selectedOption});

        let {listPayment,listPrice, listProvince, listSpecialty, listClinic } = this.state
        let response = await getDetailInfoDoctor(selectedOption.value)

        if (response && response.errCode === 0 && response.data && response.data.Markdown){
            let markdown = response.data.Markdown

            let addressClinic = '', nameClinic= '', note = '', paymentId = '', priceId = '', provinceId = '',
            selectedPayment = '', selectedPrice= '', selectedProvince = '', specialtyId = '', selectedSpecialty = '',
            clinicId = '', selectedClinic = ''
            if (response.data.Doctor_Infor)
            {
                addressClinic = response.data.Doctor_Infor.addressClinic
                nameClinic = response.data.Doctor_Infor.nameClinic
                note = response.data.Doctor_Infor.note
                paymentId = response.data.Doctor_Infor.paymentId
                priceId = response.data.Doctor_Infor.priceId
                provinceId = response.data.Doctor_Infor.provinceId
                specialtyId = response.data.Doctor_Infor.specialtyId
                clinicId = response.data.Doctor_Infor.clinicId

                selectedPayment = listPayment.find((item) => 
                {
                    // lấy item có item.value bằng với paymentId
                    return item && item.value === paymentId
                })

                selectedPrice = listPrice.find((item) => 
                {
                    // lấy item có item.value bằng với priceId
                    return item && item.value === priceId
                })

                selectedProvince = listProvince.find((item) => 
                {
                    // lấy item có item.value bằng với provinceId
                    return item && item.value === provinceId
                })

                selectedSpecialty = listSpecialty.find((item) => {
                    return item && item.value === specialtyId
                })

                selectedClinic = listClinic.find((item) => {
                    return item && item.value === clinicId
                })


            }

            this.setState({
                markdownCotent: markdown.contentMarkdown,
                HTMLContent: markdown.contentHTML,
                description: markdown.description,
                checkData: true,
                nameClinic:nameClinic,
                addressClinic: addressClinic,
                note: note,
                selectedPayment: selectedPayment,
                selectedPrice: selectedPrice,
                selectedProvince: selectedProvince,
                selectedSpecialty: selectedSpecialty,
                selectedClinic: selectedClinic
            })
        }

        else{
            this.setState({
                markdownCotent: '',
                HTMLContent:'',
                description: '',
                checkData: false,
                nameClinic:'',
                addressClinic: '',
                note: '',
                selectedPayment: '',
                selectedPrice: '',
                selectedProvince: '',
                selectedSpecialty: '',
                selectedClinic: ''
            })
        }
    };


    handleChangeSelectDoctorInfo = async (selectedOption, name) => 
    {
       
        let nameSelect = name.name
        let coppyState = {...this.state}
        coppyState[nameSelect] = selectedOption

        this.setState({
            ...coppyState
        })

        console.log(selectedOption)
    }

    handleOnchangeText = (event, id) =>{
        let coppyState = {...this.state}

        coppyState[id] = event.target.value

        this.setState({
            ...coppyState
        })
    }

    builDataInputSelect = (dataInput, type) =>
    {
        let result = []
        let {language} = this.props
        if (dataInput && dataInput.length > 0)
        {
            if (type === 'USERS'){
                dataInput.map((item, index) => {
                    let obj = {}
                    let labelVi = `${item.lastName} ${item.firstName}` 
                    let labelEn = ` ${item.firstName} ${item.lastName}` 
                    obj.label = language === LANGUAGES.VI ? labelVi : labelEn
                    obj.value = item.id
                    result.push(obj)
                })
            }

            if (type === 'PRICE'  ){
                dataInput.map((item, index) => {
                    let obj = {}
                    let labelVi = `${item.valueVi}` 
                    let labelEn = ` ${item.valueEn} USD` 
                    obj.label = language === LANGUAGES.VI ? labelVi : labelEn
                    obj.value = item.keyMap
                    result.push(obj)
                })
            }

            if (type === 'PROVINCE' || type ==="PAYMENT" ){
                dataInput.map((item, index) => {
                    let obj = {}
                    let labelVi = `${item.valueVi}` 
                    let labelEn = ` ${item.valueEn}` 
                    obj.label = language === LANGUAGES.VI ? labelVi : labelEn
                    obj.value = item.keyMap
                    result.push(obj)
                })
            }

            if (type === 'SPECIALTY')
            {
                    dataInput.map((item, index) => {
                    let obj = {}
                    obj.label = item.name
                    obj.value = item.id
                    result.push(obj)
                })
            }


            if (type === 'CLINIC')
            {
                    dataInput.map((item, index) => {
                    let obj = {}
                    obj.label = item.name
                    obj.value = item.id
                    result.push(obj)
                })
            }

        }
        return result
    }

    render() {
        let usersArr = this.state.users
        let {checkData, listSpecialty} = this.state
        
        return (
            <div className='manage-doctor-container'>
                <div className='manage-doctor-title'><FormattedMessage id="admin.manage-doctor.title"/></div>

                <div className='more-inf'>
                    <div className='content-left form-group'>
                     
                        <label><FormattedMessage id="admin.manage-doctor.select"/></label>
                        <Select 
                            onChange={this.handleChangeSelected}
                            options={this.state.listDoctors}
                            value={this.state.selectedOption}
                            placeholder={<FormattedMessage id="admin.manage-doctor.select"/>}
                        />
                    </div>
                    <div className='content-right'>
                        <label><FormattedMessage id="admin.manage-doctor.intro"/></label>
                        <textarea className='form-control' onChange={(event) => this.handleOnchangeText(event, 'description')}
                            value = {this.state.description}
                        >
                            
                        </textarea>
                    </div>
                </div>
                <div className='super-inf row'>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.price"/></label>
                        <Select 
                            onChange={this.handleChangeSelectDoctorInfo}
                            options={this.state.listPrice}
                            value={this.state.selectedPrice}
                            placeholder={<FormattedMessage id="admin.manage-doctor.price"/>}
                            name="selectedPrice"
                       
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.payment"/></label>
                        <Select 
                            onChange={this.handleChangeSelectDoctorInfo}
                            options={this.state.listPayment}
                            value={this.state.selectedPayment}
                            placeholder={<FormattedMessage id="admin.manage-doctor.payment"/>}
                            name="selectedPayment"
                        />
                    </div>

    
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.province"/></label>
                        <Select 
                            onChange={this.handleChangeSelectDoctorInfo}
                            options={this.state.listProvince}
                            value={this.state.selectedProvince}
                            placeholder={<FormattedMessage id="admin.manage-doctor.province"/>}
                            name="selectedProvince"
                        />
                    </div>

                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.nameClinic"/></label>
                        <input className='form-control'
                               onChange={(event) => this.handleOnchangeText(event, 'nameClinic')}
                               value = {this.state.nameClinic}
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.address"/></label>
                        <input className='form-control'
                         onChange={(event) => this.handleOnchangeText(event, 'addressClinic')}
                         value = {this.state.addressClinic}
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.note"/></label>
                        <input className='form-control'
                         onChange={(event) => this.handleOnchangeText(event, 'note')}
                         value = {this.state.note}
                        />
                    </div>
                </div>

                <div className='row'>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.speciality"/></label>
                        <Select 
                            onChange={this.handleChangeSelectDoctorInfo}
                            options={this.state.listSpecialty}
                            value={this.state.selectedSpecialty}
                            placeholder={<FormattedMessage id="admin.manage-doctor.speciality"/>}
                            name="selectedSpecialty"
                        />
                    </div>

                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.clinic"/></label>
                        <Select 
                            onChange={this.handleChangeSelectDoctorInfo}
                            options={this.state.listClinic}
                            value={this.state.selectedClinic}
                            placeholder={<FormattedMessage id="admin.manage-doctor.speciality"/>}
                            name="selectedClinic"
                        />
                    </div>
                </div>
                <div className='manage-doctor-editor'>
                    <MdEditor style={{ height: '450px' }} renderHTML={text => mdParser.render(text)} onChange={this.handleEditorChange} value = {this.state.markdownCotent}/>
                </div>

           
                <button className= {checkData == true ? 'save-content' : 'create-content'} onClick={() => this.handleSaveInfoMarkdown()}>
                    {checkData == true ? <FormattedMessage id="admin.manage-doctor.save"/> : <FormattedMessage id="admin.manage-doctor.add"/> }
                    </button>
            </div>
          
        );
    }

}

const mapStateToProps = state => {
    return {
        // lấy biến trong adminReduces
        language: state.app.language,
        allDoctors: state.admin.allDoctors,
        allRequired: state.admin.allRequired
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllDoctors: () => dispatch(actions.getAllDoctors()),
        saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data)),
        fetchRequiredDoctorInfo: () => dispatch(actions.fetchRequiredDoctorInfo()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
