import React from 'react';
import Loader from './../layouts/Loader';

export default class ChangePassword extends React.Component
{
    constructor(props) {
        super(props);
        this.onOldPasswordChanged = this.onOldPasswordChanged.bind(this);
        this.onPasswordChanged = this.onPasswordChanged.bind(this);
        this.onPasswordConfirmationChanged = this.onPasswordConfirmationChanged.bind(this);
        this.updatePassword = this.updatePassword.bind(this);

        this.state = {
            oldPassword: '',
            password: '',
            passwordConfirmation: '',
            id: this.props.user.id,
            successChangePassword: ''
        };
    }

    componentWillReceiveProps(props) {
        this.setState({
            successChangePassword: props.response
        });
    }

    componentWillMount() {
        if(!this.props.isLoggedIn) {
            browserHistory.push('/');
        }
        this.props.setPageTitle('Change Password');
    }

    updatePassword(e) {
        e.preventDefault();
        const data = {
            old_password: this.state.oldPassword,
            password: this.state.password,
            password_confirmation: this.state.passwordConfirmation,
            id: this.props.user.id
        };
        this.props.changePassword(data);
    }

    onOldPasswordChanged(e) {
        this.setState({
            oldPassword: e.target.value
        });
    }

    onPasswordChanged(e) {
        this.setState({
            password: e.target.value
        });
    }

    onPasswordConfirmationChanged(e) {
        this.setState({
            passwordConfirmation: e.target.value
        });
    }

    render() {
        return (
            <div>
                <div className="col-md-4"></div>
                <div className="col-md-4">
                    <Loader isLoading={this.props.loading} />
                    <form onSubmit={this.updatePassword}>
                        {
                            (this.state.successChangePassword == true)
                                ?
                                <div className="alert alert-success">
                                    You password has been updated successfully.
                                </div>
                                : null
                        }
                        {
                            (this.state.successChangePassword != true && this.state.successChangePassword != '')
                                ?
                                <div className="alert alert-danger">
                                    {this.state.successChangePassword}
                                </div>
                                : null
                        }
                        <h2 className="form-signin-heading">Change Your Password</h2>

                        <div className="form-group">
                            <input type="password" className="form-control" placeholder="Old Password" name="old_password" value={this.state.oldPassword} onChange={this.onOldPasswordChanged} />
                        </div>

                        <div className="form-group">
                            <input type="password" className="form-control" placeholder="New Password" name="password" value={this.state.password} onChange={this.onPasswordChanged} />
                        </div>

                        <div className="form-group">
                            <input type="password" className="form-control" placeholder="Confirm New Password" name="password_confirmation" value={this.state.passwordConfirmation} onChange={this.onPasswordConfirmationChanged} />
                        </div>

                        <button className="btn btn-lg btn-primary btn-block" type="submit" onClick={this.updatePassword}>Change Password</button>
                    </form>
                </div>
                <div className="col-md-4"></div>
            </div>
        );
    }
}