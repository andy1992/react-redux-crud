import React from 'react';
import { browserHistory } from 'react-router';

export default class Login extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            successLogin: ''
        };

        this.login = this.login.bind(this);
        this.onEmailChanged = this.onEmailChanged.bind(this);
        this.onPasswordChanged = this.onPasswordChanged.bind(this);
    }

    componentWillMount() {
        if(this.props.loggedIn) {
            browserHistory.push('/');
        }
        this.props.setPageTitle('Sign In');
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

    componentWillReceiveProps(nextProps) {
        if (nextProps.loggedIn == true && nextProps.user) {
            browserHistory.push('/');
        }
        this.setState({
            successLogin: nextProps.error
        });
    }

    login(e) {
        e.preventDefault();
        const credentials = {
            email: this.state.email,
            password: this.state.password
        };
        this.props.login(credentials);
    }

    render() {
        return(
            <div>
                <div className="col-md-4"></div>
                <div className="col-md-4">
                    <form onSubmit={this.login}>
                        {
                            (this.state.successLogin && this.state.successLogin.message != 'false') ?
                                <div className="alert alert-danger">
                                    {this.state.successLogin.message}
                                </div>
                                : null
                        }
                        <h2 className="form-signin-heading">Please sign in</h2>

                        <div className="form-group">
                            <input type="email" className="form-control" placeholder="Email address" name="email" value={this.state.email} onChange={this.onEmailChanged} />
                        </div>
                        <div className="form-group">
                            <input type="password" className="form-control" placeholder="Password" name="password" onChange={this.onPasswordChanged} />
                        </div>

                        <button className="btn btn-lg btn-primary btn-block" type="submit" onClick={this.login}>Sign in</button>
                    </form>
                </div>
                <div className="col-md-4"></div>
            </div>
        );
    }
}