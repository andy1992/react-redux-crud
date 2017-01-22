import Main from './../components/Main';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import {
    isLoggedIn,
    isLoggedInFailed,
    isLoggedInSuccess,
    logout,
    logoutFailed,
    logoutSuccess
} from '../actions/authActions';

function mapStateToProps(state, props) {
    return {
        loggedIn: state.auth.isLoggedIn,
        user: state.auth.user
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        isLoggedIn: () => {
            const resp = dispatch(isLoggedIn());
            resp.payload.then((response) => {
                if(response.user) {
                    dispatch(isLoggedInSuccess(response));
                } else {
                    dispatch(isLoggedInFailed(response));
                }
            });
        },
        signOut: () => {
            const resp = dispatch(logout());
            resp.payload.then((response) => {
                if(response) {
                    logoutSuccess(response);

                    // Update is logged in state
                    const isLogged = dispatch(isLoggedIn());
                    isLogged.payload.then((response) => {
                        if(response.user) {
                            dispatch(isLoggedInSuccess(response));
                        } else {
                            dispatch(isLoggedInFailed(response));
                        }
                    });
                    browserHistory.push('/');
                } else {
                    logoutFailed('Logout Failed');
                }
            });

            // reset logged in status
            /*const isLoggedIn = dispatch(isLoggedIn());
            isLoggedIn.payload.then((response) => {
                !response.error ?
                    dispatch(isLoggedInSuccess(response.data)) :
                    dispatch(isLoggedInFailed(response.data));
            });*/
        }
    };
};

const MainComponent = connect(mapStateToProps, mapDispatchToProps)(Main);

export default MainComponent;