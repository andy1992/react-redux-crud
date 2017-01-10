import React from 'react';

class ProductRow extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            checked: this.props.checked
        };
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        // TODO finish the checkbox checking methods
        this.setState({
            checked: e.target.checked
        });
        if(e.target.checked)
            this.props.addSelectedProduct(this.props.product.id);
        else
            this.props.removeSelectedProduct(this.props.product.id);
    }

    componentWillReceiveProps(props) {
        // You don't have to do this check first, but it can help prevent an unneeded render
        if (props.checked !== this.state.checked) {
            this.setState({ checked: props.checked });
        }
    }

    render() {
        return (
            <tr>
                <td>
                    <input type="checkbox"
                           className='checkboxes' onChange={this.onChange} checked={this.state.checked} />
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