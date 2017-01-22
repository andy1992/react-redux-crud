import React from 'react';

export default class GenericNotFound extends React.Component
{
    componentWillMount() {
        this.props.setPageTitle('Oops..');
    }

    render() {
        return (
            <div className="text-center">
                <h3>The page you are looking for is not found or has been removed.</h3>
            </div>
        );
    }
}