import React from 'react';

class ProductRow extends React.Component
{
    render() {
        return (
            <tr>
                <td>
                    <input type="checkbox"
                           className='checkboxes' />
                </td>
                <td>{this.props.product.name}</td>
                <td>{this.props.product.description}</td>
                <td>${parseFloat(this.props.product.price).toFixed(2)}</td>
                <td>{this.props.product.category_name}</td>
                <td>
                    <a href={'#show?id='+this.props.product.id}
                       className="btn btn-info m-r-1em">
                        Read
                    </a>
                    <a href={'#update?id='+this.props.product.id}
                       className="btn btn-primary m-r-1em">
                        Edit
                    </a>
                    <a href={'#delete?id='+this.props.product.id}
                       className="btn btn-danger">
                        Delete
                    </a>
                </td>
            </tr>
        );
    }
}

export default ProductRow;