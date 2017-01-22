import React from 'react';
import NavBar from './layouts/Navigation';
import { Link } from 'react-router';

class Main extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            pageTitle: ''
        };
        this.setPageTitle = this.setPageTitle.bind(this);
        this.signOut = this.signOut.bind(this);
    }

    componentWillMount() {
        this.props.isLoggedIn();
    }

    setPageTitle(title) {
        this.setState({
            pageTitle: title
        });
    }

    signOut() {
        this.props.signOut();
    }

    render() {
        return (
            <div>
                <NavBar signOut={this.signOut} isLoggedIn={this.props.loggedIn} user={this.props.user} />

                <div className="page-header" style={{marginTop:70}}>
                    <h1>{this.state.pageTitle}</h1>
                </div>

                {React.cloneElement(this.props.children, {...this.props, setPageTitle: this.setPageTitle, isLoggedIn: this.props.isLoggedIn, user:this.props.user})}
            </div>
        )
    }
}

export default Main;