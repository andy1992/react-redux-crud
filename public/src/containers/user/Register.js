import Register from './../../components/user/Register';
import { connect } from 'react-redux';
import {
    register,
    registerSuccess,
    registerFailed
} from './../../actions/userActions';

const mapStateToProps = (state, props) => {
    return {
        //state: state,
        //props: props
        error: state.register.error,
        response: state.register.response,
        loading: state.register.loading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        register: (values) => {
            const resp = dispatch(register(values));
            resp.payload.then((response) => {
                (!response.error)
                    ? dispatch(registerSuccess(response.data))
                    : dispatch(registerFailed(response.data));
            });
        }
    };
};

const RegisterComponent = connect(mapStateToProps, mapDispatchToProps) (Register);

export default RegisterComponent;