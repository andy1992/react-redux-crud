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

                    <button className="btn btn-danger margin-bottom-1em pull-right" style={{marginRight:'10px'}}>
                        <span className='glyphicon glyphicon-trash'></span>&nbsp;
                        Delete Selected Products
                    </button>
                </div>
            </div>
        )
    }
}
/*
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

const ProductTableComponent = connect(mapStateToProps, mapDispatchToProps)(ProductTable);*/