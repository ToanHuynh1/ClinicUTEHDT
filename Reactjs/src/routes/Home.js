import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from "../store/actions";


class Home extends Component {
    

    render() {
        const { isLoggedIn } = this.props;
        let linkToRedirect

        if (isLoggedIn && (this.props.userInfo.roleId === 'R1'))
        {
            linkToRedirect = isLoggedIn ? '/system/user-redux' : '/login';
        }
        if (isLoggedIn && this.props.userInfo.roleId === 'R2')
        {
            linkToRedirect = isLoggedIn ? '/doctor/manage-schedule' : '/login'
        }
        if (isLoggedIn && (this.props.userInfo.roleId === 'R3'))
        {
            linkToRedirect = isLoggedIn ?  '/' : '/';
        }
      

        return (
            <Redirect to={linkToRedirect} />
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
