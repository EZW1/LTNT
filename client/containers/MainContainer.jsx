import React from 'react';
import { connect } from 'react-redux';
// import TotalsDisplay from '../components/TotalsDisplay';
import LoginContainer from './LoginContainer.jsx';
// import * as actions from '../actions/actions';

// const mapStateToProps = state => ({

// });

// const mapDispatchToProps = dispatch => ({

// });

const MainContainer = props => (
  <div className="container">
    <div className="outerBox">
      <LoginContainer />
    </div>
  </div>
);

export default connect(null, null)(MainContainer);
