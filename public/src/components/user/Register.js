import React from 'react';
import { browserHistory } from 'react-router';

export default class Register extends React.Component
{
    constructor(props) {
        super(props);
        this.onEmailChanged = this.onEmailChanged.bind(this);
        this.onPasswordChanged = this.onPasswordChanged.bind(this);
        this.onPasswordConfirmationChanged = this.onPasswordConfirmationChanged.bind(this);
        this.register = this.register.bind(this);

        this.state = {
            email: '',
            password: '',
            passwordConfirmation: '',
            successRegister: ''
        };
    }

    componentWillMount() {
        if(this.props.loggedIn) {
            browserHistory.push('/');
        }
        this.props.setPageTitle('Sign Up');
    }

    register(e) {
        e.preventDefault();
        const data = {
            email: this.state.email,
            password: this.state.password,
            password_confirmation: this.state.passwordConfirmation
        };
        this.props.register(data);
    }

    onEmailChanged(e) {
        this.setState({
            email: e.target.value
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

    componentWillReceiveProps(props) {
        this.setState({
            successRegister: props.response
        });
    }

    render() {
        return (
            <div>
                <div className="col-md-4"></div>
                <div className="col-md-4">
                    <form onSubmit={this.register}>
                        {
                            (this.state.successRegister == true)
                            ?
                                <div className="alert alert-success">
                                    You have been registered successfully. You may now log in.
                                </div>
                            : null
                        }
                        {
                            (this.state.successRegister != true && this.state.successRegister != '')
                                ?
                                <div className="alert alert-danger">
                                    {this.props.response}
                                </div>
                                : null
                        }
                        <h2 className="form-signin-heading">Please sign up</h2>

                        <div className="form-group">
                            <input type="email" className="form-control" placeholder="Email address" name="email" value={this.state.email} onChange={this.onEmailChanged} />
                        </div>

                        <div className="form-group">
                            <input type="password" className="form-control" placeholder="Password" name="password" value={this.state.password} onChange={this.onPasswordChanged} />
                        </div>

                        <div className="form-group">
                            <input type="password" className="form-control" placeholder="Confirm Password" name="password_confirmation" value={this.state.passwordConfirmation} onChange={this.onPasswordConfirmationChanged} />
                        </div>

                        <button className="btn btn-lg btn-primary btn-block" type="submit" onClick={this.register}>Sign up</button>
                    </form>
                </div>
                <div className="col-md-4"></div>
            </div>
        );
    }
}