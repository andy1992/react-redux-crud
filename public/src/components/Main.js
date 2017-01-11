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
    }

    setPageTitle(title) {
        this.setState({
            pageTitle: title
        });
    }

    render() {
        return (
            <div>
                <NavBar />

                <div className="page-header" style={{marginTop:70}}>
                    <h1>{this.state.pageTitle}</h1>
                </div>

                {React.cloneElement(this.props.children, {...this.props, setPageTitle: this.setPageTitle})}
            </div>
        )
    }
}

export default Main;