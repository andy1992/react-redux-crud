import React from 'react';
import { Link } from 'react-router';

class NavComponent extends React.Component
{
    render() {
        return(
            <div>
                {
                    (!this.props.isLoggedIn) ?
                        <nav className="navbar navbar-default navbar-fixed-top">
                            <div className="container">
                                <div id="navbar" className="collapse navbar-collapse">
                                    <ul className="nav navbar-nav">
                                        <li><Link to={'/'}>Home</Link></li>
                                        <li><Link to={'/login'}>Sign In</Link></li>
                                        <li><Link to={'/register'}>Sign Up</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </nav>
                    :
                        <nav className="navbar navbar-default navbar-fixed-top">
                            <div className="container">
                                <div id="navbar" className="collapse navbar-collapse">
                                    <ul className="nav navbar-nav">
                                        <li><Link to={'/'}>Home</Link></li>
                                        <li style={{paddingTop:15}}>Welcome, {this.props.user.email}</li>
                                        <li><Link to={'/change-password'}>Change Password</Link></li>
                                        <li><Link onClick={this.props.signOut}>Sign Out</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </nav>
                }
            </div>
        );
    }
}

export default NavComponent;