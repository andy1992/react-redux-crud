import React from 'react';
import ProductTable from '../../containers/products/ProductTable';
import Pagination from '../../containers/products/Pagination';
import SearchBar from '../../containers/products/SearchBar';
import TopActions from '../../containers/products/TopActions';
import Loader from './../layouts/Loader';
import { DEFAULT_ITEM_PER_PAGE, DEFAULT_ORDER_BY, DEFAULT_ORDER_TYPE, DEFAULT_PAGE, DEFAULT_SEARCH } from './../../helpers/Pagination';
import { Link } from 'react-router';

export default class ProductGrid extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const query = this.props.location.query;
        this.props.selectAllProduct(query);
        this.props.countAllProducts(query);
        this.props.getSelectedProducts();
        this.props.setPageTitle('All Products');
    }

    render() {
        const query = this.props.location.query;
        const search = query.name ? query.name : DEFAULT_SEARCH;
        let currentPage = query.page ? query.page : DEFAULT_PAGE;

        const limit = query.item_per_page ? query.item_per_page : DEFAULT_ITEM_PER_PAGE;
        const orderBy = query.order_by ? query.order_by : DEFAULT_ORDER_BY;
        const orderType = query.order_type ? query.order_type : DEFAULT_ORDER_TYPE;
        let count = 0;
        let products = [];

        const params = {
            order_by: orderBy,
            order_type: orderType,
            item_per_page: limit,
            search: search,
            page: currentPage
        };

        if(this.props.products.products) {
            products = this.props.products.products;
            count = this.props.products.count;

            const pagesAmount = Math.ceil(count / limit);
            if(currentPage <= 0) {
                params.page = 1;
            } else if(currentPage > pagesAmount) {
                currentPage = pagesAmount;
                params.page = currentPage;
            }
        }

        const selectedProducts = this.props.selectedProducts.selectedProducts;
        //console.log(selectedProducts);

        return (
            <div>
                <Loader isLoading={this.props.products.loading} />

                <SearchBar {...params} />

                {
                    (this.props.loggedIn)
                        ?
                        <TopActions selectedProducts={selectedProducts} />
                        : null
                }

                <ProductTable isLoggedIn={this.props.loggedIn} user={this.props.user} products={products}
                              {...params}
                                selectedProducts={selectedProducts}/>

                <Pagination
                    {...params}
                    productsAmount={count}
                    onPageChanged={this.pageChanged}
                    itemPerPageChanged={this.itemPerPageChanged}
                    onInputPageChange={this.onInputPageChange}
                    goToInputPage={this.goToInputPage} />
            </div>
        );
    }
}