import React from 'react';

class Loader extends React.Component
{
    render() {
        if(this.props.isLoading == true) {
            return <div className="text-center">Loading...</div>;
        }
        return null;
    }
}

export default Loader;