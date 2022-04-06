import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import LoginContainer from './LoginContainer.jsx';
import HomeContainer from './HomeContainer.jsx';
import LoadingPage from '../components/LoadingPage.jsx';
import * as actions from '../actions/actions.js';

const mapStateToProps = ({login}) => ({
  isActiveSession: login.isActiveSession,
  doneLoading: login.doneLoading,
});

const mapDispatchToProps = dispatch => ({
  updateSession: (loggedIn) => dispatch(actions.updateSession(loggedIn)),
  checkSession: () => dispatch(actions.checkSession()),
});

const MainContainer = props => {
  useEffect(() => {
    props.checkSession()
  })
  return (
  <div className="container">
    <div className="outerBox">
      {!props.doneLoading && <LoadingPage />}
      {props.doneLoading && props.isActiveSession && <HomeContainer />}
      {props.doneLoading && !props.isActiveSession && <LoginContainer />}
    </div>
  </div>
  )
};

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
