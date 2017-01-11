import React from 'react';
import { Link } from 'react-router';

class NavComponent extends React.Component
{
    render() {
        return(
            <div>
                <nav className="navbar navbar-default navbar-fixed-top">
                    <div className="container">
                        <div id="navbar" className="collapse navbar-collapse">
                            <ul className="nav navbar-nav">
                                <li><Link to={'/'}>Home</Link></li>
                                <li><a href="#login">Sign In</a></li>
                                <li><a href="#register">Sign Up</a></li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}

export default NavComponent;