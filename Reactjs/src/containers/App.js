import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router';
import { history } from '../redux'
import { ToastContainer } from 'react-toastify';
import { userIsAuthenticated, userIsNotAuthenticated } from '../hoc/authentication';
import { path } from '../utils'
import Home from '../routes/Home';
// import Login from '../routes/Login';
import Login from './Auth/Login';
import Signup from './Auth/Signup';
import ConfirmCode from './Auth/ConfirmCode';
import System from '../routes/System';
import { CustomToastCloseButton } from '../components/CustomToast';
import ConfirmModal from '../components/ConfirmModal';
import HomePage from './HomePage/HomePage'
import ForgotPassword from './Auth/ForgotPassword';
import CustomScrollbars from '../components/CustomScrollbars';
import DetailDoctor from './Patient/Doctor/DetailDoctor'
import Doctor from '../routes/Doctor';
import BookingSchedule from '../containers/Patient/Doctor/Booking/BookingSchedule'
import VerifyEmail from './Patient/VerifyEmail'
import detailSpecialty from './Patient/Specialty/detailSpecialty';
import DetailClinic from './Patient/Clinic/DetailClinic';
import DetailGuidebook from './Patient/Guidebook/DetailGuidebook';
import Seebooking from './Patient/Booking/Seebooking';
import SeeallSpecialty from './Patient/Specialty/SeeallSpecialty';
import SeeallDoctor from './Patient/Doctor/DoctorAll/SeeallDoctor';
import SeeallClinic from './Patient/Clinic/SeeallClinic';
import UpdateInfor from './Patient/Booking/UpdateInfor';
import Support from './Patient/Support/Support';
import SeeAllGuidebook from './Patient/Guidebook/SeeAllGuidebook';
class App extends Component {

    handlePersistorState = () => {
        const { persistor } = this.props;
        let { bootstrapped } = persistor.getState();
        if (bootstrapped) {
            if (this.props.onBeforeLift) {
                Promise.resolve(this.props.onBeforeLift())
                    .then(() => this.setState({ bootstrapped: true }))
                    .catch(() => this.setState({ bootstrapped: true }));
            } else {
                this.setState({ bootstrapped: true });
            }
        }
    };

    componentDidMount() {
        this.handlePersistorState();
    }

    render() {
        return (
            <Fragment>
                <Router history={history}>
                    <div className="main-container">
                   
                        <div className="content-container">
                            <CustomScrollbars style = {{height: '100vh', width: '100%'}}>
                                <Switch>
                                    <Route path={path.HOME} exact component={(Home)} />
                                    <Route path={path.LOGIN} component={userIsNotAuthenticated(Login)} />
                                    <Route path={path.SIGNUP} component={Signup} />
                                    <Route path={path.FORGOT} component={ForgotPassword} />
                                    <Route path={path.COMFIRM} component={ConfirmCode} />
                                    <Route path={path.SYSTEM} component={userIsAuthenticated(System)} />
                                    <Route path={path.HOMEPAGE} component={HomePage} />
                                    <Route path={path.DETAIL_DOCTOR} component={DetailDoctor}/>
                                    <Route path={path.DETAIL_SPECIALTY} component={detailSpecialty}/>
                                    <Route path={path.DETAIL_CLINIC} component={DetailClinic}/>
                                    <Route path={path.DETAIL_GUIDEBOOK} component={DetailGuidebook}/>
                                    <Route path={path.BOOKING_SCHEDULE} component={BookingSchedule}/>
                                    <Route path={path.SEEBOOKING} component={Seebooking}/>
                                    <Route path={path.SEEALLSPECIALTY} component={SeeallSpecialty}/>
                                    <Route path={path.SEEALLDOCTOR} component={SeeallDoctor}/>
                                    <Route path={path.SEEALLCLINIC} component={SeeallClinic}/>
                                    <Route path={path.UPDATEINFOR} component={UpdateInfor}/>
                                    <Route path={path.SUPPORT} component={Support}/>
                                    <Route path={path.SEEALLGUIDEBOOK} component={SeeAllGuidebook}/>
                                    <Route path={'/doctor/'} component={userIsAuthenticated(Doctor)} />
                                    <Route path={path.VERIFY_EMAIL_BOOKING} component={VerifyEmail}/>
                                </Switch>
                            </CustomScrollbars>
                        </div>

                        {/* <ToastContainer
                            className="toast-container" toastClassName="toast-item" bodyClassName="toast-item-body"
                            autoClose={false} hideProgressBar={true} pauseOnHover={false}
                            pauseOnFocusLoss={true} closeOnClick={false} draggable={false}
                            closeButton={<CustomToastCloseButton />}
                        /> */}

                        <ToastContainer
                            position="bottom-right"
                            autoClose={2000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme="dark"
                        />
                    </div>
                </Router>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        started: state.app.started,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);