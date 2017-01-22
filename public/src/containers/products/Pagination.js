// If you want your component to be able to change your global state, follow the pattern below

import React from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { selectAllProduct, selectAllProductFailed, selectAllProductSuccess, countAllProducts, countAllProductsFailed, countAllProductsSuccess } from '../../actions/productActions';
import { parseQueryString } from '../../helpers/QueryString';

const Pagination = props =>
{
    // calculate number of pages depending on the total of records and the
    // "products per page" property
    let pagesAmount = Math.ceil(props.productsAmount / props.item_per_page);
    let itemPerPage = props.item_per_page;
    let orderBy = props.order_by;
    let orderType = props.order_type;
    let search = props.search;
    let appendUrl = '&name=' + search + '&order_by=' + orderBy + '&order_type=' + orderType + '&item_per_page=' + itemPerPage;
    const params = {
        search: search,
        item_per_page: itemPerPage,
        order_by: orderBy,
        order_type: orderType,
        page: props.page
    };
    // creating page elements, one for each page
    let pageIndicators = [];
    for (let i=1; i <= pagesAmount; i++) {
        pageIndicators.push(
            <li className={i == props.page ? "active":""} key={i}>
                <Link to={'?page=' + i + appendUrl} onClick={() => props.changePage({
                    search: search,
                    item_per_page: itemPerPage,
                    order_by: orderBy,
                    order_type: orderType,
                    page: i
                })} >{i}</Link>
            </li>
        )
    }

    // return paging buttons and 'go to page' form
    return (
        !props.productsAmount ? null :
            <nav className='overflow-hidden' style={{marginBottom:'20px'}}>
                {
                    (pagesAmount - 1) <= 0 ? null :
                        <ul className='pagination pull-left margin-zero'>
                            {
                                props.page == 1 ? null :
                                    <li>
                                        <Link to={'/?page=1' + appendUrl} onClick={() => props.changePage({
                                            search: search,
                                            item_per_page: itemPerPage,
                                            order_by: orderBy,
                                            order_type: orderType,
                                            page: 1
                                        })}>
                                            <span style={{marginRight: '0 .5em'}}>&laquo;</span>
                                        </Link>
                                    </li>
                            }

                            {
                                props.page == 1 ? null :
                                    <li>
                                        <Link to={'/?page='+ (props.page - 1) + appendUrl} onClick={() => props.changePage({
                                            search: search,
                                            item_per_page: itemPerPage,
                                            order_by: orderBy,
                                            order_type: orderType,
                                            page: (props.page - 1)
                                        })}>
                                            <span style={{marginRight: '0 .5em'}}>&lsaquo;</span>
                                        </Link>
                                    </li>
                            }

                            { pageIndicators }

                            {
                                props.page == pagesAmount ? null :
                                    <li>
                                        <Link to={'/?page='+ (parseInt(props.page) + 1) + appendUrl} onClick={() => props.changePage({
                                            search: search,
                                            item_per_page: itemPerPage,
                                            order_by: orderBy,
                                            order_type: orderType,
                                            page: (parseInt(props.page) + 1)
                                        })}>
                                            <span style={{marginRight: '0 .5em'}}>&rsaquo;</span>
                                        </Link>
                                    </li>
                            }

                            {
                                props.page == pagesAmount ? null :
                                    <li>
                                        <Link to={'/?page=' + pagesAmount + appendUrl} onClick={() => props.changePage({
                                            search: search,
                                            item_per_page: itemPerPage,
                                            order_by: orderBy,
                                            order_type: orderType,
                                            page: pagesAmount
                                        })}>
                                            <span style={{marginRight: '0 .5em'}}>&raquo;</span>
                                        </Link>
                                    </li>
                            }
                        </ul>
                }

                <div>
                    <div className="input-group col-md-2 pull-right">
                        <input type="hidden" name="s" value="" />
                        <input type="number"
                               className="form-control"
                               name="page"
                               min='1'
                               max={pagesAmount}
                               required
                               placeholder='Go to page'
                               id="page_input" />

                        <div className="input-group-btn">
                            <button className="btn btn-primary" onClick={() => props.gotoPage({
                                search: search,
                                item_per_page: itemPerPage,
                                order_by: orderBy,
                                order_type: orderType,
                                page: pagesAmount
                            })} >
                                Go
                            </button>
                        </div>
                    </div>

                    <div className="input-group col-md-3 pull-right" style={{marginRight:'10px'}}>
                        <select value={props.productsPerPage} id="item_per_page" className="form-control"
                                onChange={() => props.changeItemPerPage({
                                search: search,
                                item_per_page: itemPerPage,
                                order_by: orderBy,
                                order_type: orderType,
                                page: pagesAmount
                            })} >
                            <option value="5">Show 5 Products per page</option>
                            <option value="10">Show 10 Products per page</option>
                            <option value="25">Show 25 Products per page</option>
                        </select>
                    </div>
                </div>
            </nav>
    );
};

function mapStateToProps(state, props) {
    return {
        order_by: props.order_by,
        order_type: props.order_type,
        item_per_page: props.item_per_page,
        search: props.search,
        page: props.page
    };
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        changePage: (params) => {
            const products = dispatch(selectAllProduct(params));
            products.payload.then((response) => {
            !response.error ?
                dispatch(selectAllProductSuccess(response.data)) :
                dispatch(selectAllProductFailed(response.data));
            });
        },
        gotoPage: (params) => {
            const pageInput = document.getElementById("page_input");
            const pageAmount = Math.ceil(props.productsAmount / props.item_per_page);
            let destPage = parseInt(pageInput.value);
            if(destPage > pageAmount)
                destPage = pageAmount;

            params.page = destPage;
            const queryString = parseQueryString(params);
            browserHistory.push('/' + queryString);
            const products = dispatch(selectAllProduct(params));
            products.payload.then((response) => {
                !response.error ?
                    dispatch(selectAllProductSuccess(response.data)) :
                    dispatch(selectAllProductFailed(response.data));
            });
        },
        changeItemPerPage: (params) => {
            const itemPerPageInput = document.getElementById("item_per_page");
            params.item_per_page = itemPerPageInput.value;
            params.page = 1;

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

const PaginationComponent = connect(mapStateToProps, mapDispatchToProps)(Pagination);

export default PaginationComponent;