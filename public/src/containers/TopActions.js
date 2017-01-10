import React from 'react';
import ProductRow from './../components/products/ProductRow';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';

const TopActions = props => {
    return (
        <div className="">
            <SearchByName searchText={this.props.searchText} searchTerm={this.props.searchTerm} onInputSearchChange={this.props.onInputSearchChange} />

            {
                (this.props.isLoggedIn == 'true')
                    ?
                    <div>
                        <a href="#create" className="btn btn-primary margin-bottom-1em pull-right" >
                            <span className='glyphicon glyphicon-plus'></span>&nbsp;
                            Create Product
                        </a>

                        <button className="btn btn-danger margin-bottom-1em pull-right" onClick={this.props.deleteSelected} style={{marginRight:'10px'}}>
                            <span className='glyphicon glyphicon-trash'></span>&nbsp;
                            Delete Selected Products
                        </button>
                    </div>
                    : null
            }
        </div>
    );
};

function mapStateToProps(state, props) {
    const params = {
        order_by: props.orderBy,
        order_type: props.orderType,
        item_per_page: props.productsPerPage,
        search: props.search,
        page: props.currentPage
    };
    return {
        params: params,
        state: state
    };
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        sortChanged: (params, orderBy) => {
            const queryString = parseQueryString(params);

            browserHistory.push('/' + queryString);

            const products = dispatch(selectAllProduct(params));
            products.payload.then((response) => {
                !response.error ?
                    dispatch(selectAllProductSuccess(response.data)) :
                    dispatch(selectAllProductFailed(response.data));
            });
        }
    };
};

const ProductTableComponent = connect(mapStateToProps, mapDispatchToProps)(ProductTable);

export default ProductTableComponent;