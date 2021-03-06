import React from 'react';
import { connect } from 'react-redux';
import LoginBox from '../components/LoginBox.jsx';
import RegisterBox from '../components/RegisterBox.jsx';
import * as actions from '../actions/loginActions.js';

const mapStateToProps = ({ login }) => ({
  isLoginOpen: login.isLoginOpen,
  isRegisterOpen: login.isRegisterOpen,
});

const mapDispatchToProps = dispatch => ({
  switchToLogin: () => dispatch(actions.switchToLogin()),
  switchToRegister: () => dispatch(actions.switchToRegister()),
  submitLogin: (details) => dispatch(actions.submitLogin(details)),
  submitRegister: (details) => dispatch(actions.submitRegister(details)),
});

const LoginContainer = props => (
  <div className="root-container">
    <div className="box-controller">
      <div className={"controller " + (props.isLoginOpen ? "selected-controller" : "")} onClick={props.switchToLogin}>
        Login
      </div>
      <div className={"controller " + (props.isRegisterOpen ? "selected-controller" : "")} onClick={props.switchToRegister}>
        Register
      </div>
    </div>
    <div className="box-container">
      {props.isLoginOpen && <LoginBox submitLogin={props.submitLogin}/>}
      {props.isRegisterOpen && <RegisterBox submitRegister={props.submitRegister}/>}
    </div>
  </div>
);

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);