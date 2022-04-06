import React from 'react';
import { connect } from 'react-redux';
import LoginBox from '../components/LoginBox.jsx';
import RegisterBox from '../components/RegisterBox.jsx';
import * as actions from '../actions/actions.js';

const mapStateToProps = ({ login }) => ({
  isLoginOpen: login.isLoginOpen,
  isRegisterOpen: login.isRegisterOpen,
});

const mapDispatchToProps = dispatch => ({
  switchToLogin: () => dispatch(actions.switchToLogin()),
  switchToRegister: () => dispatch(actions.switchToRegister()),
  submitDetails: (details) => dispatch(actions.submitDetails(details))
});

const LoginContainer = props => (
  <div className="root-container">
    <div className="box-controller">
      <div className={"controller"} >
        <button onClick={props.switchToLogin}>Login</button>
      </div>
      <div className={"controller"}>
      <button onClick={props.switchToRegister}>Register</button>
      </div>
    </div>
    <div className="box-container">
      {`isLoginOpen: ${props.isLoginOpen} ------- `}
      {`isRegisterOpen: ${props.isRegisterOpen}`}
      {props.isLoginOpen && <LoginBox submitDetails={props.submitDetails}/>}
      {props.isRegisterOpen && <RegisterBox submitDetails={props.submitDetails}/>}
    </div>
  </div>
);

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);