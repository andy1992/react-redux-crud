import Login from './../../components/auth/Login';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import {
    login,
    loginSuccess,
    loginFailed,
    isLoggedIn,
    isLoggedInSuccess,
    isLoggedInFailed
} from './../../actions/authActions';

const mapStateToProps = (state, props) => {
    return {
        isLoggedIn: state.auth.isLoggedIn.message,
        state: state,
        props: props,
        user: state.auth.user
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        login: (credentials) => {
            const resp = dispatch(login(credentials));
            console.log(resp);
            resp.payload.then((response) => {
                if(response.user) {
                    console.log(response);
                    dispatch(loginSuccess(response));

                    if(response.user) {
                        const isLogged = dispatch(isLoggedIn());
                        isLogged.payload.then((response) => {
                            if(response.user) {
                                dispatch(isLoggedInSuccess(response));
                            } else {
                                dispatch(isLoggedInFailed(response));
                            }
                        });
                        browserHistory.push('/');
                    }
                }
                else
                    dispatch(loginFailed(response));
            });
        }
    };
};

const LoginComponent = connect(mapStateToProps, mapDispatchToProps) (Login);

export default LoginComponent;