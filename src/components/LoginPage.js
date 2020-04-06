import React from 'react';
import { startLogin } from '../actions/auth';
import { connect } from 'react-redux';

export const LoginPage = (props) => (
    <div className="box-layout">
        <div className="box-layout__box">
            <h1 className="box-layout__title">Boilerplate</h1>
            <p>tagline for app</p>
            <button className="button" onClick={() => {
                props.startLogin()
            }}>Login with google</button>
        </div>
    </div>
);

const matchDispatchToProps = (dispatch) => {
    return {
        startLogin: () => dispatch(startLogin())
    }
}

export default connect(undefined, matchDispatchToProps)(LoginPage);