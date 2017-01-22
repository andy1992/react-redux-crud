import ChangePassword from './../../components/user/ChangePassword';
import { connect } from 'react-redux';
import {
    updatePassword,
    updatePasswordFailed,
    updatePasswordSuccess
} from './../../actions/userActions';

const mapStateToProps = (state) => {
    return {
        error: state.updatePassword.error,
        response: state.updatePassword.response,
        loading: state.updatePassword.loading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changePassword: (values) => {
            const resp = dispatch(updatePassword(values));
            resp.payload.then((response) => {
                (!response.error)
                    ? dispatch(updatePasswordSuccess(response.data))
                    : dispatch(updatePasswordFailed(response.data));
            });
        }
    };
};

const ChangePasswordComponent = connect(mapStateToProps, mapDispatchToProps) (ChangePassword);

export default ChangePasswordComponent;