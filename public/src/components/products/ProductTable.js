import React from 'react';
import ProductRow from './ProductRow';

class ProductTable extends React.Component
{
    render() {
        const rows = this.props.products.map(function(product, i) {
            return (
                <ProductRow
                    key={i}
                    product={product}
                />
            );
        }.bind(this));

        return (
            !rows.length
                ? <div className="alert alert-danger" style={{marginTop:70}}>No products found.</div>
                :
                <table className="table table-bordered table-hover">
                    <thead>
                    <tr>
                        <th className="text-center" style={{width:'1.5%'}}>
                            <input type="checkbox"/>
                        </th>
                        <th style={{width:'20%'}}>
                            Name
                        </th>
                        <th style={{width:'40%'}}>
                            Description
                        </th>
                        <th style={{width:'9%'}}>
                            Price
                        </th>
                        <th style={{width:'9%'}}>
                            Category
                        </th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {rows}
                    </tbody>
                </table>
        );
    }
}

export default ProductTable;