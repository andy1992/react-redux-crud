import React from 'react';
import { Link, browserHistory } from 'react-router';

export default class TopActions extends React.Component {
    render() {
        return (
            <div className="">
                <div>
                    <Link to={'/product/create'} className="btn btn-primary margin-bottom-1em pull-right" >
                        <span className='glyphicon glyphicon-plus'></span>&nbsp;
                        Create Product
                    </Link>

                    <button className="btn btn-danger margin-bottom-1em pull-right" onClick={() => this.props.deleteSelected(this.props.selectedProducts)} style={{marginRight:'10px'}}>
                        <span className='glyphicon glyphicon-trash'></span>&nbsp;
                        Delete Selected Products
                    </button>
                </div>
            </div>
        )
    }
}